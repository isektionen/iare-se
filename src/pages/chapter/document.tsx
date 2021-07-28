import strapi, { gql, axios } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";

import { useRouter } from "next/router";

import useTranslation from "next-translate/useTranslation";
import loadNamespaces from "next-translate/loadNamespaces";
import {
    ComponentDocumentDocument,
    Document as DocType,
    UsersPermissionsUser,
} from "../../types/strapi";
import { DocumentContainer } from "../../components/document/DocumentContainer";
import Document from "components/document/Document";
/*const Document = dynamic(import("components/document/Document"), {
    ssr: false,
});*/
import { useDocument } from "hooks/use-document";

import {
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { LayoutWrapper } from "components/layout/LayoutWrapper";
import React, { useEffect, useState } from "react";

import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from "react-icons/io";
import DocumentCard from "components/document/DocumentCard";
/*const DocumentCard = dynamic(import("components/document/DocumentCard"), {
    ssr: false,
});*/
import { getDate } from "utils/dates";
import { DocumentListItem } from "components/document/DocumentListItem";
import { DocumentBody, DocumentTable } from "components/document/DocumentTable";
import {
    PageContainer,
    PageOptions,
} from "components/pagination/PageContainer";
import {
    PageSelector,
    SelectorOptions,
} from "components/pagination/PageSelector";
import { HiOutlineDownload } from "react-icons/hi";
import dynamic from "next/dynamic";

import setLanguage from "next-translate/setLanguage";
import { LanguageWrapper } from "components/LanguageWrapper";

interface Props {
    document: DocType;
    locale: string;
}

export interface AllDocType {
    id: string;
    documentContent?: ComponentDocumentDocument;
    authors?: UsersPermissionsUser[];
    __component?: string;
    type?: string;
}

const DocumentControl = ({ data }: { data: DocType }) => {
    const { t } = useTranslation("document");
    const { setDocument, document, goBackward, goForward } = useDocument();

    const [currentDocument, setCurrentDocument] = useState(
        data.currentRegulations
    );
    useEffect(() => {
        if (currentDocument) {
            const href = currentDocument.file?.url;
            setDocument({ href });
        }
    }, [currentDocument]);
    return (
        <Flex
            position="absolute"
            zIndex={2}
            alignSelf="normal"
            bottom={10}
            m={4}
            bg="gray.900"
            color="white"
            justifyContent="space-evenly"
            align="center"
            p={2}
        >
            <IconButton
                aria-label="go back"
                icon={<IoIosArrowDropleftCircle />}
                variant="iareSolid"
                disabled={document.currentPage === 1}
                onClick={goBackward}
            />
            <Text>
                {t("controlPages", {
                    currentPage: document.currentPage as number,
                    pages: document.pages as number,
                })}
            </Text>
            <IconButton
                aria-label="go forward"
                icon={<IoIosArrowDroprightCircle />}
                variant="iareSolid"
                disabled={document.currentPage === document.pages}
                onClick={goForward}
            />
        </Flex>
    );
};

const minimize = (key: string) => {
    const match = key.match(/document\.(.+)-document/);
    if (match) {
        return match[1];
    }
    return key;
};

const DocumentView = ({ locale, document: data }: Props) => {
    const { t, lang } = useTranslation("document");
    const allRawDocs = data.allDocuments as AllDocType[];
    const docs = allRawDocs.reduce(
        (acc, curr) => [
            ...acc,
            {
                ...curr,
                // @ts-ignore: REST and GraphQL types are not identical
                type: minimize(curr?.__component ?? ""),
            },
        ],
        [] as AllDocType[]
    );

    const handleChangePage = ({ limit, offset }: PageOptions) => {
        return docs.slice(offset, offset + limit).map((doc) => ({
            label: doc.documentContent?.label,
            date: getDate(
                doc.documentContent?.file?.created_at,
                "dd MMM",
                lang
            ),
            type: doc.type,
            url: doc.documentContent?.file?.url,
            authors:
                doc?.authors?.map((user) => user.nickname).join(", ") ?? "---",
        }));
    };

    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            pos="relative"
            w="full"
            minH="80vh"
        >
            <DocumentContainer loading={"LOADING"} fallback={"NO PDF"}>
                <Flex
                    bg="gray.50"
                    order={{ base: 1, md: 0 }}
                    justify="center"
                    direction="column"
                    p={8}
                    w={{ base: "full", md: "50%" }}
                >
                    <Box mb={8} w="full">
                        <Heading as="h2" size="lg" mb={8}>
                            {t("headDocuments")}
                        </Heading>
                        <Flex
                            direction="row"
                            justify={{
                                base: "flex-start",
                                lg: "space-evenly",
                            }}
                            w="full"
                            wrap={{
                                base: "nowrap",
                                md: "wrap",
                                lg: "nowrap",
                            }}
                        >
                            <DocumentCard
                                isCurrent
                                label={data.currentStatute?.label}
                                url={data.currentStatute?.file?.url}
                                createdAt={
                                    data.currentStatute?.file?.created_at
                                }
                            />
                            <DocumentCard
                                isCurrent
                                label={data.currentRegulations?.label}
                                url={data.currentRegulations?.file?.url}
                                createdAt={
                                    data.currentRegulations?.file?.created_at
                                }
                            />
                            <DocumentCard
                                isCurrent
                                label={data.currentFinancialReport?.label}
                                url={data.currentFinancialReport?.file?.url}
                                createdAt={
                                    data.currentFinancialReport?.file
                                        ?.created_at
                                }
                            />
                        </Flex>
                    </Box>
                    <PageContainer
                        itemQuantity={docs.length}
                        itemsPerPage={10}
                        onChangePage={handleChangePage}
                    >
                        <DocumentTable
                            columns={[
                                {
                                    label: t("tableHeader.title"),
                                    id: "label",
                                },
                                {
                                    label: t("tableHeader.type"),
                                    id: "type",
                                },
                                {
                                    label: t("tableHeader.authors"),
                                    id: "authors",
                                },
                                {
                                    label: t("tableHeader.date"),
                                    id: "date",
                                },
                            ]}
                            actions={[
                                {
                                    id: "download",
                                    icon: HiOutlineDownload,
                                    onClick: (row) =>
                                        window &&
                                        window.open(row.url, "_blank"),
                                },
                            ]}
                        >
                            {(header, actions) => (
                                <DocumentBody
                                    header={header}
                                    actions={actions}
                                />
                            )}
                        </DocumentTable>
                        <Box
                            as={PageSelector}
                            pageSize={3}
                            d="flex"
                            justifyContent="space-evenly"
                            next={
                                <IconButton
                                    aria-label="next"
                                    icon={<IoIosArrowDroprightCircle />}
                                    variant="iareSolid"
                                />
                            }
                            previous={
                                <IconButton
                                    aria-label="previous"
                                    icon={<IoIosArrowDropleftCircle />}
                                    variant="iareSolid"
                                />
                            }
                        >
                            {({
                                page,
                                isActive,
                                onClick,
                            }: {
                                page: number;
                                isActive: boolean;
                                onClick: () => void;
                            }) => (
                                <Button
                                    p={4}
                                    bg={isActive ? "gray.200" : "gray.50"}
                                    onClick={onClick}
                                >
                                    {page}
                                </Button>
                            )}
                        </Box>
                    </PageContainer>
                </Flex>
                <Flex
                    order={{ base: 0, md: 1 }}
                    w={{ base: "full", md: "50%" }}
                    bg="gray.200"
                    position="relative"
                    justify="center"
                    align="center"
                    maxH="90vh"
                    overflow="hidden"
                    p={8}
                >
                    <DocumentControl data={data} />
                    <Document />
                </Flex>
            </DocumentContainer>
        </Flex>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const { data } = await axios.get("/document?_locale=" + locale);

    return {
        props: {
            locale,
            document: data,
        },
    };
};

export default DocumentView;
