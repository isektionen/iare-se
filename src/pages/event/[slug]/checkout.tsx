import {
    Heading,
    VStack,
    Text,
    Wrap,
    Spacer,
    HStack,
    Button,
    Input,
    Tag,
    TagCloseButton,
    TagLabel,
    Switch,
    FormLabel,
    Flex,
    Divider,
    Alert,
    AlertIcon,
    useDisclosure,
    IconButton,
    Stack,
    useBreakpointValue,
} from "@chakra-ui/react";
import { AutoComplete, Option } from "components/Autocomplete";
import { Breadcrumb } from "components/Breadcrumb";
import { NextImage } from "components/NextImage";
import eventModel from "models/event";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { fetchHydration, useHydrater } from "state/layout";
import { AllOption, FormState, useCheckout } from "state/products";
import { LayoutProps } from "types/global";
import { Event, Product } from "types/strapi";
import _ from "underscore";
import { isBeforeDeadline } from "utils/dates";
import { DEV } from "utils/env";
import { conformLocale } from "utils/lang";
import { defcast } from "utils/types";

type ExtendedProduct = Product & { available: boolean; count: number };
interface Props {
    password: string | null;
    event: Event;
    products: ExtendedProduct[];
}

interface IFormErrorHelper {
    hasError: boolean;
    text: string;
}

const FormErrorHelper = (props: IFormErrorHelper) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    return (
        <React.Fragment>
            {isOpen && props.hasError && (
                <Alert status="error">
                    <AlertIcon />
                    {props.text}

                    {/*<IconButton
                        colorScheme="blackAlpha"
                        aria-label="close"
                        variant="ghost"
                        size="sm"
                        position="absolute"
                        right="8px"
                        top="8px"
                        onClick={onClose}
                        icon={<MdClose />}
                    />*/}
                </Alert>
            )}
        </React.Fragment>
    );
};

// Naming of variables could be improved, what does v (see below) mean for example? Name should be self explanatory.0
interface ProductProps extends ExtendedProduct {
    updateProduct: (id: string, v: number) => void;
    resetProduct: (id: string) => void;
}

const ProductItem = ({
    id,
    media,
    name,
    price,
    updateProduct,
    resetProduct,
    stock,
    count,
    ...props
}: ProductProps) => {
    media = defcast(media);

    const [value, setValue] = useState<number>(0);

    const stockLeft = useMemo(() => stock - count, [stock, count]);
    const handleDec = useCallback(() => {
        if (value > 0) {
            updateProduct(id, value - 1);
            setValue((v) => v - 1);
        }
    }, [id, updateProduct, value]);

    const added = useMemo(() => value > 0, [value]);

    const handleInc = useCallback(() => {
        updateProduct(id, value + 1);
        setValue((v) => v + 1);
    }, [id, updateProduct, value]);

    const handleToggle = useCallback(() => {
        if (added) {
            resetProduct(id);
            setValue(0);
            return;
        }
        if (value === 0) {
            setValue(1);
            updateProduct(id, 1);
        }
    }, [added, id, resetProduct, updateProduct, value]);

    return (
        <VStack
            h="sm"
            w={{ sm: "3xs", md: "2xs" }}
            p={4}
            spacing={4}
            shadow={added ? "2xl" : undefined}
            borderRadius={7}
            align="start"
        >
            <NextImage
                w="100%"
                overflow="hidden"
                borderRadius={7}
                src={media.url}
                width={media.width || 0}
                height={media.height || 0}
            />
            <Heading fontSize="lg">{name}</Heading>
            <Spacer />
            <HStack w="full">
                <Text>{price} SEK</Text>
                <Spacer />
                <HStack maxW="120px">
                    <Button
                        size="xs"
                        disabled={value === 0}
                        onClick={handleDec}
                    >
                        -
                    </Button>
                    <Text>{value}</Text>
                    <Button
                        size="xs"
                        onClick={handleInc}
                        disabled={!props.available || value === stockLeft}
                    >
                        +
                    </Button>
                </HStack>
            </HStack>
            <Button
                variant="iareSolid"
                isFullWidth
                onClick={handleToggle}
                disabled={!props.available || (value == stockLeft && !added)}
            >
                {added ? "Ta bort" : "Lägg till"}
            </Button>
        </VStack>
    );
};

interface AttachmentProps {
    id: string;
    name: string;
    consumable: boolean;
    options: AllOption[];
    appendData: (id: string, ref: string, data: any) => void;
    getData: (
        id: string,
        ref: string
    ) => FormState["optionResults"][0] | undefined;
    hasError: (ref: string) => boolean;
}

const Attachment = (props: AttachmentProps) => {
    const { t } = useTranslation("checkout");

    const isMd = useBreakpointValue({ base: false, md: true });

    const ParseOption = (option: AllOption, i: number, id: string) => {
        const ref = `${option.reference}::${_.last(id.split("::"))}`;

        switch (option?.type) {
            case "switch":
                return (
                    <Stack
                        key={i}
                        align="start"
                        spacing={{ base: 8, md: 16 }}
                        w="full"
                        h={{ base: "auto", md: "40px" }}
                        direction={{ base: "column", md: "row" }}
                    >
                        <VStack align="start" spacing={{ base: 2, md: 6 }}>
                            <HStack spacing={0.5}>
                                <FormLabel
                                    fontWeight="semibold"
                                    fontSize="xl"
                                    htmlFor={option.reference}
                                >
                                    {option.label}
                                </FormLabel>
                                {option.required && (
                                    <Heading size="sm" color="red">
                                        *
                                    </Heading>
                                )}
                            </HStack>
                            <Text w="180px" noOfLines={2}>
                                {option.description}
                            </Text>
                        </VStack>
                        <VStack h="full" justify="end">
                            <Switch
                                isInvalid={props.hasError(ref)}
                                id={option.reference}
                                size="lg"
                                isRequired={option.required}
                                onChange={(e) =>
                                    props.appendData(
                                        id,
                                        option.reference,
                                        e.target.checked
                                    )
                                }
                            />
                            <FormErrorHelper
                                hasError={props.hasError(ref)}
                                text={t("error.is-required", {
                                    field: option.label,
                                })}
                            />
                        </VStack>
                    </Stack>
                );

            case "select":
                return (
                    <Stack
                        key={i}
                        align="start"
                        spacing={{ base: 8, md: 16 }}
                        w="full"
                        position="relative"
                        h={{ base: "auto", md: "90px" }}
                        direction={{ base: "column", md: "row" }}
                    >
                        <VStack align="start" spacing={6}>
                            <HStack spacing={0.5}>
                                <Heading size="md">{option.label}</Heading>
                                {option.required && (
                                    <Heading size="sm" color="red">
                                        *
                                    </Heading>
                                )}
                            </HStack>
                            <Text w="180px" noOfLines={2}>
                                {option.description}
                            </Text>
                        </VStack>
                        <VStack h="full" justify={{ base: "start", md: "end" }}>
                            <AutoComplete
                                canCreate
                                createText={(option) =>
                                    t("select.create", { option: option ?? "" })
                                }
                                isInvalid={props.hasError(ref)}
                                options={option.options}
                                result={
                                    (props.getData(id, option.reference)
                                        ?.data ?? []) as Option[]
                                }
                                setResult={(e) =>
                                    props.appendData(id, option.reference, e)
                                }
                                allowMany={option.allowMany}
                                renderSelect={(option: Option) => (
                                    <Tag
                                        borderRadius="full"
                                        variant="solid"
                                        colorScheme="blackAlpha"
                                    >
                                        <TagLabel>{option.label}</TagLabel>
                                        <TagCloseButton />
                                    </Tag>
                                )}
                                inputLeftIcon={<FaSearch />}
                                inputOptions={{
                                    w: "300px",
                                    variant: "filled",
                                    bg: "gray.50",
                                    _hover: {
                                        bg: "gray.200",
                                    },
                                    _active: {
                                        bg: "gray.300",
                                    },
                                    _focus: {
                                        bg: "gray.100",
                                        borderColor: "blue.300",
                                    },
                                }}
                                listOptions={{
                                    position: "absolute",
                                    w: "300px",
                                    zIndex: 9999,
                                    mt: 1,
                                    spacing: 1,
                                    bg: "white",
                                    borderRadius: "md",
                                    borderColor: "gray.300",
                                    borderWidth: "1px",
                                    overflow: "hidden",
                                }}
                                listItemOptions={{
                                    p: 2,
                                    _hover: {
                                        bg: "gray.200",
                                    },
                                }}
                            />
                            <FormErrorHelper
                                hasError={props.hasError(ref)}
                                text={t("error.is-required", {
                                    field: option.label,
                                })}
                            />
                        </VStack>
                    </Stack>
                );
            case "input":
                return (
                    <Stack
                        key={i}
                        align={{ base: "start", md: "end" }}
                        spacing={{ base: 8, md: 16 }}
                        w="full"
                        direction={{ base: "column", md: "row" }}
                    >
                        <VStack align="start" spacing={6}>
                            <HStack spacing={0.5}>
                                <Heading size="md">{option.label}</Heading>
                                {option.required && (
                                    <Heading size="sm" color="red">
                                        *
                                    </Heading>
                                )}
                            </HStack>
                            <Text w="180px" noOfLines={4}>
                                {option.description}
                            </Text>
                        </VStack>
                        <VStack h="full" justify="end" w="full">
                            <Input
                                isInvalid={props.hasError(option.reference)}
                                size="md"
                                maxW={{ base: "full", md: "300px" }}
                                variant="filled"
                                bg="gray.50"
                                _hover={{
                                    bg: "gray.200",
                                }}
                                _active={{
                                    bg: "gray.300",
                                }}
                                _focus={{
                                    bg: "gray.100",
                                    borderColor: "blue.300",
                                }}
                                onChange={(e) =>
                                    props.appendData(
                                        id,
                                        option.reference,
                                        e.target.value
                                    )
                                }
                            />
                            <FormErrorHelper
                                hasError={props.hasError(option.reference)}
                                text={t("error.is-required", {
                                    field: option.label,
                                })}
                            />
                        </VStack>
                    </Stack>
                );

            default:
                return <HStack key={i}></HStack>;
        }
    };

    return (
        <VStack
            w="full"
            position="relative"
            overflowY="visible"
            align="start"
            spacing={4}
        >
            {props.options.map((v, i) => ParseOption(v, i, props.id))}
            {props.consumable && (
                <Flex>
                    <Text color="gray.600" fontSize="sm">
                        {t("consumable-disclaimer.left")}
                        <b>{props.name}</b>
                        {t("consumable-disclaimer.right")}
                    </Text>
                </Flex>
            )}
            {!props.consumable && (
                <Text color="gray.600" fontSize="sm">
                    {t("non-consumable-disclaimer", { product: props.name })}
                </Text>
            )}
        </VStack>
    );
};

const View = ({
    password,
    event,
    products,
    header,
    footer,
}: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    const { t } = useTranslation("checkout");
    const router = useRouter();
    const path = [
        { label: "Aktuellt", href: "/blog" },
        { label: event.title, href: `/event/${event.slug}` },
        { label: "Osa", href: `#` },
    ];

    const isDev = useMemo(() => DEV(), []);

    const isMd = useBreakpointValue({ base: false, md: true });

    const {
        attachments,
        updateProduct,
        resetProduct,
        formState,
        appendData,
        getFormData,
        hasError,
        withSubmit,
        internalState,
        error,
        resetCheckout,
    } = useCheckout(products);

    useEffect(() => {
        // removing password query
        router.replace(`/event/${event.slug}/checkout`, undefined, {
            shallow: true,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSummary = useCallback(() => {
        if (password) {
            router.push(`/event/${event.slug}/summary?password=${password}`);
        } else {
            router.push(`/event/${event.slug}/summary`);
        }
    }, [event.slug, router, password]);

    return (
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
            <Heading>{t("products")}</Heading>
            <Wrap shouldWrapChildren spacing={8}>
                {products.map((p) => (
                    <ProductItem
                        key={p.id}
                        {...p}
                        updateProduct={updateProduct}
                        resetProduct={resetProduct}
                    />
                ))}
            </Wrap>
            {isDev && <pre>{JSON.stringify(formState, null, 2)}</pre>}

            {attachments.length > 0 && (
                <React.Fragment>
                    <Heading>{t("attachments")}</Heading>

                    <VStack
                        w="full"
                        align="start"
                        position="relative"
                        spacing={8}
                    >
                        {_.sortBy(attachments, "consumable")
                            .map((att, i) => (
                                <React.Fragment key={i}>
                                    <Heading size="lg">{att.name}</Heading>
                                    <Divider />
                                    <Attachment
                                        {...att}
                                        appendData={appendData}
                                        getData={getFormData}
                                        hasError={hasError}
                                    />
                                </React.Fragment>
                            ))}
                    </VStack>
                </React.Fragment>
            )}
            <VStack w="full" align="start">
                <FormErrorHelper
                    hasError={hasError("form-is-empty")}
                    text={t("error.is-empty")}
                />
                <Button
                    isFullWidth={!isMd}
                    variant="iareSolid"
                    onClick={withSubmit(handleSummary)}
                    rightIcon={<BiChevronRight />}
                >
                    {t("next-step")}
                </Button>
                {error.filter((p) => p !== "form-is-empty").length > 0 && (
                    <Text color="red.400" fontWeight="bold" fontSize="xs">
                        {t("form-has-requirements")}
                    </Text>
                )}
            </VStack>
        </VStack>
    );
};

export default View;

export const getServerSideProps: GetServerSideProps = async ({
    locale,
    params,
    query,
}) => {
    locale = conformLocale(locale);
    const { slug } = params as { slug: string };
    const isGuarded = await eventModel.checkIfGuarded(locale, slug);
    const { password = null } = query as { password: string | null };
    if (isGuarded) {
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

    const isAvailable = await eventModel.checkStatus(locale, slug);

    if (!isAvailable) {
        return {
            redirect: {
                destination: `/event/${slug}?callback=max.capacity`,
                permanent: true,
            },
        };
    }

    const data = await eventModel.find(locale, slug);

    if (!isBeforeDeadline(data.event?.schedule?.deadline)) {
        return {
            redirect: {
                destination: `/event/${slug}?callback=due.date`,
                permanent: true,
            },
        };
    }

    const products = await eventModel.findProducts(locale, slug);
    return {
        props: {
            password,
            event: data.event,
            products,
            ...(await fetchHydration()),
        },
    };
};
