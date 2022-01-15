import {
    Text,
    Center,
    Heading,
    Spinner,
    VStack,
    HStack,
    IconButton,
    Tag,
    TagCloseButton,
    TagLabel,
    Wrap,
} from "@chakra-ui/react";
import { Breadcrumb } from "components/Breadcrumb";
import { GetServerSideProps } from "next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    AllOption,
    FormState,
    getInnerId,
    MetaOption,
    useSummary,
} from "state/products";
import { conformLocale } from "utils/lang";
import { Event, Product, UploadFile } from "types/strapi";
import eventModel from "models/event";
import { isBeforeDeadline } from "utils/dates";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { DEV } from "utils/error";
import { NextImage } from "components/NextImage";
import { HiTrash } from "react-icons/hi";
import { defcast } from "utils/types";
import _ from "underscore";

interface IProductItem extends DetailedFormSummary {}
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
                            {option.data.filter((p) => p !== null).join(", ")}
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
    return (
        <HStack w="full" align="start" spacing={8}>
            <NextImage
                w="35%"
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
                <Text>{props.total} SEK</Text>
                {props.optionResults.map(RenderOptions)}
            </VStack>
            <IconButton
                size="sm"
                aria-label="remove"
                icon={<HiTrash />}
                onClick={props.onClick}
            />
        </HStack>
    );
};

interface Props {
    event: Event;
    products: Product[];
}

type DetailedFormSummary = Omit<FormState, "optionResults"> & {
    name: string;
    total: number;
    media: UploadFile;
    optionResults: (FormState["optionResults"][0] & {
        type: AllOption["type"];
    })[];
    onClick: () => void;
};

export const Summary = ({ event, products }: Props) => {
    const { t } = useTranslation("summary");
    const router = useRouter();
    const path = [
        { label: "Aktuellt", href: "/blog" },
        { label: event.title, href: `/event/${event.slug}` },
        { label: "Osa", href: `/event/${event.slug}/checkout` },
        { label: "Sammanfattning", href: `/event/${event.slug}/summary` },
    ];

    const [loading, setLoading] = useState(true);
    const isDev = useMemo(() => DEV(), []);

    const { formState, error, getType, resetProduct } = useSummary();

    const getReference = useCallback((s: string) => {
        const [parent, reference] = s.split("::");
        return [parent, reference];
    }, []);

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
            {!loading && (
                <React.Fragment>
                    <Heading textTransform="capitalize">{event.title}</Heading>
                    <Text>{event.description}</Text>
                    <Heading textTransform="capitalize">{t("summary")}</Heading>
                    <VStack spacing={8}>
                        {productSummary.map((product, i) => (
                            <ProductItem key={i} {...product} />
                        ))}
                    </VStack>
                </React.Fragment>
            )}
            {isDev && <pre>{JSON.stringify(productSummary, null, 2)}</pre>}
            {loading && (
                <Center w="full" h="80vh" flexDirection="column">
                    <Spinner size="xl" mb={8} />
                    <Heading size="md">{t("loading")}</Heading>
                </Center>
            )}
        </VStack>
    );
};

export const getServerSideProps: GetServerSideProps = async ({
    locale,
    params,
    query,
}) => {
    locale = conformLocale(locale);
    const { slug } = params as { slug: string };
    const isGuarded = await eventModel.checkIfGuarded(locale, slug);
    if (isGuarded) {
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
        props: { event: data.event, products },
    };
};

export default Summary;
