import strapi, { gql, axios } from "lib/strapi";
import { GetStaticProps } from "next";

import useTranslation from "next-translate/useTranslation";
import {
    ComponentDocumentDocuments,
    Document as DocumentType,
} from "../../types/strapi";

import {
    Box,
    Center,
    chakra,
    Divider,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Tag,
    Text,
    Tooltip,
    useBreakpointValue,
    useOutsideClick,
    Wrap,
} from "@chakra-ui/react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

import _ from "underscore";
import { LayoutProps } from "types/global";
import { fetchHydration, useHydrater } from "state/layout";
import { NextImage } from "components/NextImage";
import { DocumentContainer } from "../../components/document/DocumentContainer";
import { useDocument } from "state/document";
interface Props {
    data: DocumentType;
    locale: string;
}

const ItemThumbnail = ({
    file,
    name,
    businessYear,
    current,
    category,
    size = 250,
}: ComponentDocumentDocuments & { size: number }) => {
    const { t } = useTranslation("document");
    const [isFocused, setIsFocused] = useState(false);
    const { thumbnail } = file?.formats ?? { thumbnail: undefined };
    const fullCategoryName = category?.name ?? undefined;
    const categoryName =
        fullCategoryName && fullCategoryName.length > 18
            ? fullCategoryName.slice(0, 18) + "..."
            : fullCategoryName;

    const doc = useDocument();
    const openDocument = useCallback(() => {
        if (file?.url) {
            doc({
                file: file.url,
                title: name,
            });
        }
    }, [doc, file?.url, name]);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
        openDocument();
    }, [openDocument]);
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref,
        handler: () => setIsFocused(false),
    });
    return (
        <Box
            ref={ref}
            p={2}
            rounded="lg"
            transition="all 0.35s"
            bg={"gray.50"}
            w={72}
            borderColor={isFocused ? "gray.500" : "gray.100"}
            borderWidth="1px"
            shadow={isFocused ? "lg" : "md"}
            cursor="pointer"
            onClick={handleFocus}
        >
            <Flex align="center">
                {categoryName && (
                    <Box>
                        <Tooltip hasArrow label={fullCategoryName}>
                            <Tag
                                fontWeight="bold"
                                colorScheme={isFocused ? "brand" : "gray"}
                            >
                                <Text>{categoryName}</Text>
                            </Tag>
                        </Tooltip>
                    </Box>
                )}
                <Spacer />
                <Menu>
                    {({ isOpen, onClose }) => (
                        <>
                            <MenuButton
                                isActive={isOpen}
                                px={4}
                                py={2}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                transition="all 0.2s"
                            >
                                <Icon as={HiDotsVertical} boxSize={5} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openDocument();
                                        onClose();
                                    }}
                                >
                                    {t("thumbnail.menu.open")}
                                </MenuItem>
                                {file?.url && (
                                    <MenuItem
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onClose();
                                        }}
                                    >
                                        <chakra.a
                                            href={file.url}
                                            download={name}
                                            target="_blank"
                                        >
                                            {t("thumbnail.menu.download")}
                                        </chakra.a>
                                    </MenuItem>
                                )}
                                {!file?.url && (
                                    <MenuItem isDisabled>
                                        {t("thumbnail.menu.download")}
                                    </MenuItem>
                                )}
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Flex>
            <Box p={4}>
                <Center w="full" pb={4}>
                    <Center
                        bg="white"
                        p={2}
                        rounded="2xl"
                        clipPath="polygon(0% 100%, 0% 0%, 80% 0%, 100% 15%, 100% 100%)"
                        width={Math.SQRT1_2 * size * 1.1}
                        height={size * 1.1}
                    >
                        {thumbnail && (
                            <NextImage
                                src={thumbnail.url}
                                width={Math.SQRT1_2 * size}
                                height={1 * size}
                                layout="intrinsic"
                            />
                        )}
                        {!thumbnail && (
                            <chakra.span fontWeight="bold">PDF</chakra.span>
                        )}
                    </Center>
                </Center>
                <Flex align="center" direction="column">
                    <Text fontWeight="semibold" fontSize="xl" color="gray.700">
                        {name}
                    </Text>
                    <Divider my={4} borderColor="gray.200" />
                    <Flex w="full" align="flex-start">
                        <Box>
                            <Text fontWeight="semibold">
                                {t("thumbnail.businessYear")}
                            </Text>
                            <Text color="gray.500">
                                {businessYear ? businessYear : "---"}
                            </Text>
                        </Box>
                        <Spacer />
                        <Box>
                            {current && (
                                <Tag fontWeight="bold" colorScheme="brand">
                                    {t("thumbnail.activeDocument")}
                                </Tag>
                            )}
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

const DocumentView = ({ data, header, footer }: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    const { t, lang } = useTranslation("document");

    const documents = useMemo(
        () =>
            data.document
                ? (data.document as unknown as ComponentDocumentDocuments[])
                : [],
        [data.document]
    );
    const sizeVariant = useBreakpointValue({ base: 200, md: 120 }) as number;
    return (
        <>
            <DocumentContainer />
            <Box py={16}>
                <Wrap
                    shouldWrapChildren
                    spacing={4}
                    justify={{ base: "center", md: "flex-start" }}
                >
                    {documents.map((d, i) => (
                        <ItemThumbnail
                            key={"thumbnail-" + i}
                            {...d}
                            size={sizeVariant}
                        />
                    ))}
                </Wrap>
            </Box>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const { data } = await strapi.query<{ document: DocumentType }>({
        query: gql`
            query {
                document {
                    document {
                        name
                        date
                        category {
                            name
                        }
                        file {
                            url
                            formats
                        }
                        archived
                        current
                        businessYear
                    }
                }
            }
        `,
    });
    return {
        props: {
            ...(await fetchHydration()),
            locale,
            data: data.document,
        },
        revalidate: 2 * 60,
    };
};

export default DocumentView;
