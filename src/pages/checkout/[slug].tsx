import {
    Box,
    Heading,
    VStack,
    Text,
    Wrap,
    SimpleGrid,
    Spacer,
    HStack,
    Button,
    Input,
    useNumberInput,
} from "@chakra-ui/react";
import { Breadcrumb } from "components/Breadcrumb";
import { NextImage } from "components/NextImage";
import eventModel from "models/event";
import { GetServerSideProps, GetStaticPaths } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useEffect, useMemo } from "react";
import { AllOption, useCheckout } from "state/products";
import { Event, Product, UploadFile } from "types/strapi";
import { isBeforeDeadline } from "utils/dates";
import { conformLocale } from "utils/lang";
import { defcast } from "utils/types";
interface Props {
    event: Event;
    products: Product[];
}

interface ProductProps extends Product {
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
}: ProductProps) => {
    media = defcast(media);

    const [value, setValue] = useState<number>(0);

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
                    <Button size="xs" onClick={handleDec}>
                        -
                    </Button>
                    <Text>{value}</Text>
                    <Button size="xs" onClick={handleInc}>
                        +
                    </Button>
                </HStack>
            </HStack>
            <Button variant="iareSolid" isFullWidth onClick={handleToggle}>
                {added ? "Ta bort" : "Lägg till"}
            </Button>
        </VStack>
    );
};

interface AttachmentProps {
    name: string;
    options: AllOption[];
}

const Attachment = (props: AttachmentProps) => {
    const parseOption = (option: AllOption, i: number) => {
        switch (option.type) {
            case "input":
                return (
                    <HStack key={i} align="end" spacing={16} w="full">
                        <VStack align="start" spacing={6}>
                            <HStack spacing={0.5}>
                                <Heading size="md">{option.label}</Heading>
                                {option.required && (
                                    <Heading size="sm" color="red">
                                        *
                                    </Heading>
                                )}
                            </HStack>
                            <Text maxW="180px" noOfLines={2}>
                                {option.description}
                            </Text>
                        </VStack>
                        <Input size="sm" maxW="300px" />
                    </HStack>
                );
            default:
                return <HStack></HStack>;
        }
    };

    return <VStack w="full">{props.options.map(parseOption)}</VStack>;
};

const View = ({ event, products }: Props) => {
    const { t } = useTranslation("checkout");
    const router = useRouter();

    const path = [
        { label: "Aktuellt", href: "/blog" },
        { label: event.title, href: `/event/${event.slug}` },
        { label: "Osa", href: `#` },
    ];

    const { attachments, updateProduct, resetProduct } = useCheckout(products);

    useEffect(() => {
        router.replace(`/checkout/${event.slug}`, undefined, { shallow: true });
    }, []);

    return (
        <React.Fragment>
            <VStack
                overflow="hidden"
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
                <Wrap shouldWrapChildren>
                    {products.map((p) => (
                        <ProductItem
                            key={p.id}
                            {...p}
                            updateProduct={updateProduct}
                            resetProduct={resetProduct}
                        />
                    ))}
                </Wrap>
                <Heading>{t("attachments")}</Heading>
                <VStack w="full" align="start">
                    {attachments.map((att, i) => (
                        <Attachment key={i} {...att} />
                    ))}
                </VStack>
            </VStack>
        </React.Fragment>
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
