import {
    Text,
    Center,
    Heading,
    Spinner,
    VStack,
    HStack,
    IconButton,
    Tag,
    TagLabel,
    Wrap,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputGroup,
    Select,
    InputLeftElement,
    Button,
    useToast,
    useDisclosure,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Box,
    Badge,
    Stack,
    useBreakpointValue,
    ModalCloseButton,
    ModalHeader,
} from "@chakra-ui/react";
import { Breadcrumb } from "components/Breadcrumb";
import { GetServerSideProps } from "next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    AllFormOptions,
    AllOption,
    component2type,
    FormState,
    getInnerId,
    MetaOption,
    useSummary,
} from "state/products";
import { conformLocale } from "utils/lang";
import { Event, Product, ProductOption, UploadFile } from "types/strapi";
import eventModel from "models/event";
import { isBeforeDeadline } from "utils/dates";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { DEV } from "utils/env";
import { NextImage } from "components/NextImage";
import { HiTrash } from "react-icons/hi";
import { defcast } from "utils/types";
import _ from "underscore";
import { countries, Country } from "country-data";
import { BiChevronRight } from "react-icons/bi";
import { checkoutClient } from "lib/checkout";
import { usePayment } from "hooks/use-payment";
import Script from "next/script";
import { MetaData, OrderReceipt } from "types/summary";
import { LayoutProps } from "types/global";
import { fetchHydration, useHydrater } from "state/layout";
import { ICreateBody } from "pages/api/checkout/create";
interface IProductItem extends DetailedFormSummary {
    isRemovable?: boolean;
}
const ProductItem = (props: IProductItem) => {
    const { t } = useTranslation("summary");

    const RenderOptions = (
        option: DetailedFormSummary["optionResults"][0],
        i: number
    ) => {
        switch (option.type) {
            case "input":
                return (
                    <React.Fragment key={i}>
                        <Heading size="md">{option.label}</Heading>
                        <Text noOfLines={2}>
                            {option.data
                                .map((p) => (p === null ? "-" : p))
                                .join(", ")}
                        </Text>
                    </React.Fragment>
                );
            case "switch":
                return (
                    <React.Fragment key={i}>
                        <Heading size="md">{option.label}</Heading>
                        <Text>{t(`switch.${_.first(option.data)}`)}</Text>
                    </React.Fragment>
                );
            case "select":
                const data = option.data as MetaOption[];
                return (
                    <React.Fragment key={i}>
                        <Heading size="md">{option.label}</Heading>
                        <Wrap shouldWrapChildren>
                            {data.map((option, index) => (
                                <Tag
                                    key={index}
                                    borderRadius="full"
                                    variant="solid"
                                    colorScheme="blackAlpha"
                                >
                                    <TagLabel>{option.label}</TagLabel>
                                </Tag>
                            ))}
                        </Wrap>
                    </React.Fragment>
                );
        }
    };

    const isMultiple = useMemo(
        () => !new RegExp(/#\d+$/).test(props.name),
        [props.name]
    );
    const isFree = useMemo(() => props.price === 0, [props.price]);
    return (
        <Stack
            direction={{ base: "column", md: "row" }}
            w="full"
            align="start"
            spacing={8}
        >
            <NextImage
                w={{ base: "full", md: "35%" }}
                borderRadius={7}
                overflow="hidden"
                src={defcast(props.media.url)}
                width={defcast(props.media.width)}
                height={defcast(props.media.height)}
            />
            <VStack flex={1} align="start">
                <HStack>
                    {isMultiple && <Heading> {props.amount} x</Heading>}

                    <Heading textTransform="capitalize">{props.name}</Heading>
                </HStack>
                {isFree ? (
                    <Text>{t("is-free")}</Text>
                ) : (
                    <Text>{props.total} SEK</Text>
                )}

                {props.optionResults
                    .filter(
                        (p) =>
                            p.data.length !== 0 &&
                            p.reference !== undefined &&
                            p.label !== undefined
                    )
                    .map(RenderOptions)}
            </VStack>
            {props.isRemovable && (
                <IconButton
                    alignSelf={{ base: "end", md: "start" }}
                    size="sm"
                    aria-label="remove"
                    icon={<HiTrash />}
                    onClick={props.onClick}
                />
            )}
        </Stack>
    );
};

interface Props {
    event: Event;
    products: Product[];
    reciept?: OrderReceipt;
}

type DetailedFormSummary = Omit<FormState, "optionResults"> & {
    name: string;
    total: number;
    media: UploadFile;
    productReference: string;
    /*optionResults: (FormState["optionResults"][0] & {
        type: AllOption["type"];
    })[];*/
    optionResults: {
        type: AllOption["type"];
        label: string;
        reference: string;
        data: (string | MetaOption | boolean | null)[];
    }[];
    onClick: () => void;
};

type Path = { path: { label: string; href: string }[] };

const SummaryCheckout = ({
    event,
    products,
    path,
}: Omit<Props, "receipt"> & Path) => {
    const { t, lang } = useTranslation("summary");
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [orderReference, setOrderReference] = useState<string>();
    const isDev = useMemo(() => DEV(), []);

    // only supporting English and Swedish currently
    const localeConversion: Record<string, "en-GB" | "sv-SE"> = useMemo(
        () => ({
            en: "en-GB",
            sv: "sv-SE",
            "en-GB": "en-GB",
            "sv-SE": "sv-SE",
        }),
        []
    );

    const {
        formState,
        error,
        getType,
        resetProduct,
        updateCustomerData,
        customer,
        customerError,
        hasError,
        withSubmit,
        isLoading,
        resetCustomer,
        resetCheckout,
    } = useSummary();

    const { hydrateCheckout, checkout } = usePayment({
        config: {
            containerId: "checkout-modal",
            language: localeConversion[lang],
        },
    });

    const getReference = useCallback((s: string) => {
        const [parent, reference] = s.split("::");
        return [parent, reference];
    }, []);

    const findCountry = useCallback(
        (name: string) => defcast(countries.all.find((p) => p.name === name)),
        []
    );

    const sweden = findCountry("Sweden");

    const [selectedCountry, setSelectedCountry] = useState(sweden);

    const productSummary = useMemo(() => {
        return formState.reduce((acc, it) => {
            const ref = getInnerId(it.reference);
            const productData = products.find((p) => p.id == ref);
            if (productData) {
                return [
                    ...acc,
                    {
                        name: it.name || productData.name,
                        reference: it.reference,
                        productReference: productData.reference,
                        media: defcast(productData.media),
                        amount: it.amount,
                        price: it.price,
                        total: it.price * it.amount,
                        onClick: () => resetProduct(it.reference),
                        optionResults: it.optionResults.reduce((_acc, _it) => {
                            const [parent, reference] = getReference(
                                _it.reference
                            );
                            const productOption = defcast(
                                productData.product_options
                            ).find((p) => p?.reference === reference);
                            const type = getType(_it.reference);
                            if (productOption && type) {
                                return [
                                    ..._acc,
                                    {
                                        label: _it.label,
                                        type,
                                        data: _it.data,
                                        reference: reference,
                                    },
                                ];
                            }
                            return [..._acc];
                        }, [] as DetailedFormSummary["optionResults"]),
                    },
                ];
            }
            return [...acc];
        }, [] as DetailedFormSummary[]);
    }, [formState, getReference, getType, products, resetProduct]);

    const totalCost = useMemo(
        () => productSummary.reduce((acc, it) => acc + it.total, 0),

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [productSummary, productSummary.length]
    );
    const rsvpButtonText = useMemo(
        () =>
            totalCost === 0
                ? t("rsvp.free")
                : t("rsvp.paid", { cost: totalCost, currency: "SEK" }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const toaster = useToast();
    const { isOpen, onClose, onOpen } = useDisclosure();

    const handleSubmit = useCallback(async () => {
        const { reference, reserved, paymentId } = await checkoutClient.create({
            // TODO: PRODUCT REF MIGHT BREAK RELATION IN BACKEND
            items: productSummary.map((product) => ({
                __reference: product.reference,
                reference: product.productReference,
                name: product.name,
                quantity: product.amount,
            })),
            reference: defcast(event.slug),
            customer,
            options: productSummary.reduce((acc, it) => {
                return [
                    ...acc,
                    ...it.optionResults.reduce((_acc, _it) => {
                        return [
                            ..._acc,
                            {
                                label: _it.label,
                                type: _it.type,
                                reference: it.reference + "::" + _it.reference,
                                data: _it.data,
                            },
                        ];
                    }, [] as { reference: string; data: any; label: string; type: string }[]),
                ];
            }, [] as ICreateBody["options"]),
        });
        if (reserved && !paymentId && reference) {
            setOrderReference(reference);

            toaster({
                title: t("checkout.complete.title", { code: reference }),
                description: t("checkout.complete.description", {
                    email: customer.email,
                }),
                status: "success",
                duration: 8000,
            });
            router.push(
                `/event/${event.slug}/summary?reference=${reference}`,
                undefined,
                { shallow: false, scroll: false }
            );
        } else if (paymentId && reserved && reference) {
            setOrderReference(reference);

            onOpen();
            hydrateCheckout(paymentId);
        }
    }, [
        customer,
        event.slug,
        hydrateCheckout,
        onOpen,
        productSummary,
        router,
        t,
        toaster,
    ]);

    useEffect(() => {
        if (checkout && isOpen) {
            checkout.on("pay-initialized", () => {
                checkout.send("payment-order-finalized", true);
            });
            checkout.on("payment-completed", ({ paymentId }) => {
                onClose();
                toaster({
                    title: t("checkout.complete.title", {
                        code: defcast(orderReference),
                    }),
                    description: t("checkout.complete.description", {
                        email: customer.email,
                    }),
                    status: "success",
                    duration: 8000,
                });
                router.push(
                    `/event/${event.slug}/summary?reference=${orderReference}`,
                    undefined,
                    { shallow: false, scroll: false }
                );
            });
        }
    }, [
        checkout,
        customer.email,
        event.slug,
        isOpen,
        onClose,
        orderReference,
        router,
        t,
        toaster,
    ]);

    useEffect(() => {
        if (error.length > 0 && formState.length === 0) {
            router.push(
                `/event/${event.slug}?callback=no.products`,
                undefined,
                {
                    shallow: true,
                }
            );
            return () => {};
        }
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateCustomerData({
            phone: {
                prefix: _.first(sweden.countryCallingCodes),
            },
        });
        return () => {
            resetCustomer();
            resetCheckout();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (checkout) {
            checkout.setLanguage(localeConversion[lang]);
        }
    }, [checkout, lang, localeConversion]);

    const isMd = useBreakpointValue({ base: false, md: true });

    return (
        <React.Fragment>
            <Script
                src={process.env.NEXT_PUBLIC_CHECKOUT_SRC}
                strategy="afterInteractive"
            />
            <Modal
                size={isMd ? "md" : "full"}
                scrollBehavior="inside"
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Checkout</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody maxH="650px">
                        <Box id="checkout-modal"></Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <VStack
                bg="white"
                pos="relative"
                align="start"
                spacing={8}
                w="full"
                px={{ base: 3, md: 16 }}
                pt={{ base: 4, md: 10 }}
                pb={{ base: 8, md: 16 }}
            >
                <Breadcrumb path={path} />
                {!loading && (
                    <React.Fragment>
                        <Heading textTransform="capitalize">
                            {event.title}
                        </Heading>
                        <Text>{event.description}</Text>
                        <Heading textTransform="capitalize">
                            {t("summary")}
                        </Heading>
                        <VStack spacing={8}>
                            {productSummary.map((product, i) => (
                                <ProductItem isRemovable key={i} {...product} />
                            ))}
                        </VStack>
                        <Heading textTransform="capitalize">
                            {t("customer")}
                        </Heading>

                        <FormControl
                            isRequired
                            isInvalid={hasError("firstname")}
                        >
                            <FormLabel htmlFor="firstname">
                                {t("details.firstname")}
                            </FormLabel>
                            <Input
                                variant="filled"
                                id="firstname"
                                type="firstname"
                                onChange={(e) => {
                                    updateCustomerData({
                                        firstName: e.target.value,
                                    });
                                }}
                            />
                            <FormErrorMessage>
                                {t("required", {
                                    field: t("details.firstname"),
                                })}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            isRequired
                            isInvalid={hasError("lastname")}
                        >
                            <FormLabel htmlFor="lastname">
                                {t("details.lastname")}
                            </FormLabel>
                            <Input
                                variant="filled"
                                id="lastname"
                                type="lastname"
                                onChange={(e) => {
                                    updateCustomerData({
                                        lastName: e.target.value,
                                    });
                                }}
                            />
                            <FormErrorMessage>
                                {t("required", {
                                    field: t("details.lastname"),
                                })}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            isRequired
                            isInvalid={
                                hasError("phone.number") ||
                                hasError("phone.prefix")
                            }
                        >
                            <FormLabel htmlFor="phone">
                                {t("details.phone.number")}
                            </FormLabel>
                            <InputGroup variant="filled">
                                <InputLeftElement
                                    w={{ base: "40%", md: "20%" }}
                                >
                                    <Select
                                        borderRightRadius={0}
                                        value={selectedCountry.name}
                                        onChange={(e) => {
                                            const country = findCountry(
                                                e.target.value
                                            );
                                            setSelectedCountry(country);
                                            updateCustomerData({
                                                phone: {
                                                    prefix: defcast(
                                                        _.first(
                                                            country.countryCallingCodes
                                                        )
                                                    ),
                                                },
                                            });
                                        }}
                                    >
                                        {countries.all.map((c, i) => (
                                            <option key={i} value={c.name}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </Select>
                                </InputLeftElement>
                                <Input
                                    id="phone"
                                    type="tel"
                                    pl={{ base: "40%", md: "20%" }}
                                    onChange={(e) => {
                                        const prefix = _.first(
                                            selectedCountry.countryCallingCodes
                                        ) as string;
                                        updateCustomerData({
                                            phone: {
                                                number: e.target.value.startsWith(
                                                    prefix
                                                )
                                                    ? e.target.value.replace(
                                                          prefix,
                                                          ""
                                                      )
                                                    : e.target.value,
                                            },
                                        });
                                    }}
                                />
                            </InputGroup>

                            <FormErrorMessage>
                                {hasError("phone.number") &&
                                    t("required", {
                                        field: t("details.phone.number"),
                                    })}
                                {hasError("phone.prefix") &&
                                    t("required", {
                                        field: t("details.phone.prefix"),
                                    })}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={hasError("email")}>
                            <FormLabel htmlFor="email">
                                {t("details.email")}
                            </FormLabel>
                            <Input
                                variant="filled"
                                id="email"
                                type="email"
                                onChange={(e) => {
                                    updateCustomerData({
                                        email: e.target.value,
                                    });
                                }}
                            />
                            <FormErrorMessage>
                                {t("required", { field: t("details.email") })}
                            </FormErrorMessage>
                        </FormControl>

                        <Button
                            isFullWidth={!isMd}
                            isLoading={isLoading && !isOpen && !orderReference}
                            disabled={orderReference ? true : false}
                            variant="iareSolid"
                            rightIcon={<BiChevronRight />}
                            onClick={withSubmit(handleSubmit)}
                        >
                            {rsvpButtonText}
                        </Button>
                    </React.Fragment>
                )}
                {isDev && <pre>{JSON.stringify(customerError, null, 2)}</pre>}
                {loading && (
                    <Center w="full" h="80vh" flexDirection="column">
                        <Spinner size="xl" mb={8} />
                        <Heading size="md">{t("loading")}</Heading>
                    </Center>
                )}
            </VStack>
        </React.Fragment>
    );
};

const SummaryView = ({
    event,
    products,
    reciept,
    path,
}: Required<Props> & Path) => {
    const { t, lang } = useTranslation("summary");
    const country = defcast(
        countries.all.find((p) =>
            p.countryCallingCodes.includes(
                reciept.data.customerData.phoneNumber.prefix
            )
        )
    );

    const statusColor: Record<string, string> = useMemo(
        () => ({
            created: "purple",
            failed: "red",
            completed: "green",
            charged: "yellow",
            refunded: "green",
        }),
        []
    );

    const status = useMemo(() => {
        if (reciept.data.status && reciept.data.status.length > 0) {
            return _.first(
                _.sortBy(reciept.data.status, (obj) => {
                    let score = obj.timestamp;
                    switch (obj.status) {
                        case "completed":
                            score += 1e6;
                            break;
                        case "charged":
                            score += 0.5e6;
                            break;
                        case "failed":
                            score += 2e6;
                            break;
                        case "created":
                            break;
                        case "refunded":
                            score += 1.5e6;
                            break;
                    }
                    return score;
                }).reverse()
            );
        }
    }, [reciept.data.status]);

    const productSummary: DetailedFormSummary[] = useMemo(() => {
        return (
            reciept?.data.order.items.reduce((acc, it) => {
                const product = defcast(
                    products.find((p) => p.reference === it.reference)
                );

                return [
                    ...acc,
                    {
                        name: it.name,
                        reference: it.reference,
                        amount: it.quantity,
                        price: it.unitPrice / 100,
                        total: it.netTotalAmount / 100,
                        media: defcast(
                            products.find((p) => p.reference === it.reference)
                        ).media as UploadFile,
                        productReference: it.reference,
                        optionResults: reciept.data.options
                            .filter((p) => p.reference.includes(it.__reference))
                            .map((option) => {
                                const path = option.reference.split("::");
                                const optionReference = _.last(path);
                                const _option = product?.product_options?.find(
                                    (p) => p?.reference === optionReference
                                );
                                const optionData = _.first(
                                    _option?.data ?? []
                                ) as AllFormOptions;
                                return {
                                    label: optionData.label,
                                    data: option.data as unknown as (
                                        | string
                                        | MetaOption
                                        | boolean
                                        | null
                                    )[],
                                    reference: option.reference,
                                    type: optionData
                                        ? component2type[
                                              optionData?.__component
                                          ]
                                        : "input",
                                };
                            }),
                        /*optionResults: _.pairs(reciept.data.options).map(
                            ([k, v]) => {
                                const option = product.product_options?.find(
                                    (p) => p?.reference === k
                                ) as ProductOption;
                                const optionData = _.first(
                                    option?.data
                                ) as AllFormOptions;
                                return {
                                    label: optionData?.label,
                                    data: v,
                                    reference: option?.reference,
                                    type: optionData
                                        ? component2type[
                                              optionData?.__component
                                          ]
                                        : "input",
                                };
                            }
                        ),*/

                        onClick: () => {},
                    },
                ];
            }, [] as DetailedFormSummary[]) ?? []
        );
    }, [products, reciept?.data.options, reciept?.data.order.items]);

    return (
        <React.Fragment>
            <VStack
                bg="white"
                pos="relative"
                align="start"
                spacing={8}
                w="full"
                px={{ base: 3, md: 16 }}
                pt={{ base: 4, md: 10 }}
                pb={{ base: 8, md: 16 }}
            >
                <Breadcrumb path={path} />
                <Heading textTransform="capitalize">{event.title}</Heading>
                <Text>{event.description}</Text>

                <Heading textTransform="capitalize">{t("summary")}</Heading>
                <VStack spacing={8}>
                    {productSummary &&
                        productSummary.map((product, i) => (
                            <ProductItem key={i} {...product} />
                        ))}
                </VStack>
                <Heading textTransform="capitalize">{t("customer")}</Heading>

                <FormControl isDisabled>
                    <FormLabel htmlFor="firstname">
                        {t("details.firstname")}
                    </FormLabel>
                    <Input
                        variant="flushed"
                        id="firstname"
                        type="firstname"
                        value={reciept.data.customerData.firstName}
                    />
                </FormControl>

                <FormControl isDisabled>
                    <FormLabel htmlFor="lastname">
                        {t("details.lastname")}
                    </FormLabel>
                    <Input
                        variant="flushed"
                        id="lastname"
                        type="lastname"
                        value={reciept.data.customerData.lastName}
                    />
                </FormControl>

                <FormControl isDisabled>
                    <FormLabel htmlFor="phone">
                        {t("details.phone.number")}
                    </FormLabel>
                    <InputGroup variant="flushed">
                        <InputLeftElement w={{ base: "40%", md: "20%" }}>
                            <Select variant="flushed" value={country.name}>
                                <option value={country.name}>
                                    {country.name}
                                </option>
                            </Select>
                        </InputLeftElement>
                        <Input
                            id="phone"
                            type="tel"
                            pl={{ base: "40%", md: "20%" }}
                            value={reciept.data.customerData.phoneNumber.number}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl isDisabled>
                    <FormLabel htmlFor="email">{t("details.email")}</FormLabel>
                    <Input
                        variant="flushed"
                        id="email"
                        type="email"
                        value={reciept.data.customerData.email}
                    />
                </FormControl>
                <Wrap shouldWrapChildren w="full" spacing={{ base: 4, md: 8 }}>
                    <Badge variant="subtle">{reciept.created_at}</Badge>
                    <Badge variant="subtle">{reciept.event.slug}</Badge>
                    {status && (
                        <Badge
                            variant="subtle"
                            colorScheme={statusColor[status.status]}
                        >
                            {status.status}
                        </Badge>
                    )}

                    {!reciept.data.sentEmailConfirmation ? (
                        <Badge variant="subtle" colorScheme="green">
                            EMAIL SENT
                        </Badge>
                    ) : (
                        <Badge variant="subtle" colorScheme="yellow">
                            EMAIL IN QUEUE
                        </Badge>
                    )}

                    <Badge variant="subtle">
                        {reciept.data.order.reference}
                    </Badge>
                    {reciept.data.paymentData?.paymentId && (
                        <Badge variant="subtle">
                            {reciept.data.paymentData?.paymentId}
                        </Badge>
                    )}

                    {reciept.data.paymentData?.payment?.method && (
                        <Badge variant="subtle">
                            {reciept.data.paymentData?.payment?.method}
                        </Badge>
                    )}
                    {reciept.data.paymentData?.payment?.type && (
                        <Badge variant="subtle">
                            {reciept.data.paymentData?.payment?.type}
                        </Badge>
                    )}
                </Wrap>
            </VStack>
        </React.Fragment>
    );
};

export const Summary = ({
    event,
    products,
    reciept,
    header,
    footer,
}: LayoutProps<Props>) => {
    const { t, lang } = useTranslation("summary");

    useHydrater({ header, footer });

    const path = useMemo(
        () => [
            { label: "Aktuellt", href: "/blog" },
            { label: event.title, href: `/event/${event.slug}` },
            { label: "Osa", href: `/event/${event.slug}/checkout` },
            { label: "Sammanfattning", href: `/event/${event.slug}/summary` },
        ],
        [event.slug, event.title]
    );

    if (reciept) {
        return (
            <SummaryView
                event={event}
                products={products}
                path={path}
                reciept={reciept}
            />
        );
    }

    return <SummaryCheckout event={event} products={products} path={path} />;
};

export const getServerSideProps: GetServerSideProps = async ({
    locale,
    params,
    query,
}) => {
    locale = conformLocale(locale);
    const { slug } = params as { slug: string };

    const reciept = await eventModel.findReciept(
        locale,
        query.reference as string
    );

    const isGuarded = await eventModel.checkIfGuarded(locale, slug);
    if (!reciept && isGuarded) {
        const { password = null } = query as { password: string | null };
        const { validated } = await eventModel.findGuarded(
            locale,
            slug,
            password
        );

        if (!validated) {
            return {
                redirect: {
                    destination: `/event/${slug}?callback=invalid.password`,
                    permanent: true,
                },
            };
        }
    }

    const data = await eventModel.find(locale, slug);

    if (!reciept && !isBeforeDeadline(data.event?.schedule?.deadline)) {
        return {
            redirect: {
                destination: `/event/${slug}?callback=due.date`,
                permanent: true,
            },
        };
    }

    if (!reciept && query.reference) {
        return {
            redirect: {
                destination: `/event/${slug}?callback=invalid.reciept`,
                permanent: true,
            },
        };
    }

    const products = await eventModel.findProducts(locale, slug);

    return {
        props: {
            event: data.event,
            products,
            reciept,
            ...(await fetchHydration()),
        },
    };
};

export default Summary;
