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
    Tag,
    TagCloseButton,
    TagLabel,
    Switch,
    FormLabel,
    Flex,
} from "@chakra-ui/react";
import { AutoComplete, Option } from "components/Autocomplete";
import { Breadcrumb } from "components/Breadcrumb";
import { NextImage } from "components/NextImage";
import eventModel from "models/event";
import { GetServerSideProps, GetStaticPaths } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { AllOption, FormState, useCheckout } from "state/products";
import { Event, Product, UploadFile } from "types/strapi";
import _ from "underscore";
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
                    <Button
                        size="xs"
                        disabled={value === 0}
                        onClick={handleDec}
                    >
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
    id: string;
    name: string;
    consumable: boolean;
    options: AllOption[];
    appendData: (id: string, ref: string, data: any) => void;
    getData: (
        id: string,
        ref: string
    ) => FormState["optionResults"][0] | undefined;
}

const Attachment = (props: AttachmentProps) => {
    const { t } = useTranslation("checkout");

    const ParseOption = (option: AllOption, i: number, id: string) => {
        switch (option?.type) {
            case "switch":
                return (
                    <HStack key={i} align="end" spacing={16} w="full">
                        <VStack align="start" spacing={6}>
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

                        <Switch
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
                    </HStack>
                );

            case "select":
                return (
                    <HStack
                        key={i}
                        align="end"
                        spacing={16}
                        w="full"
                        position="relative"
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
                        <AutoComplete
                            options={option.options}
                            result={
                                (props.getData(id, option.reference)?.data ??
                                    []) as Option[]
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
                    </HStack>
                );
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
                            <Text w="180px" noOfLines={2}>
                                {option.description}
                            </Text>
                        </VStack>
                        <Input
                            size="md"
                            maxW="300px"
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
                    </HStack>
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
                    </Text>
                    <Text
                        ml={1}
                        fontWeight="bold"
                        color="gray.600"
                        fontSize="sm"
                    >
                        {props.name}
                    </Text>

                    <Text color="gray.600" fontSize="sm">
                        {t("consumable-disclaimer.right")}
                    </Text>
                </Flex>
            )}
        </VStack>
    );
};

const View = ({ event, products }: Props) => {
    const { t } = useTranslation("checkout");
    const router = useRouter();

    const path = [
        { label: "Aktuellt", href: "/blog" },
        { label: event.title, href: `/event/${event.slug}` },
        { label: "Osa", href: `#` },
    ];

    const {
        attachments,
        updateProduct,
        resetProduct,
        formState,
        appendData,
        getFormData,
    } = useCheckout(products);
    useEffect(() => {
        router.replace(`/checkout/${event.slug}`, undefined, { shallow: true });
    }, []);

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
                <Heading>{t("attachments")}</Heading>
                <pre>{JSON.stringify(formState, null, 2)}</pre>

                <VStack w="full" align="start" position="relative" spacing={8}>
                    {attachments.map((att, i) => (
                        <Attachment
                            key={i}
                            {...att}
                            appendData={appendData}
                            getData={getFormData}
                        />
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
