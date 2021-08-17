import strapi, { gql, axios } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";

import { useRouter } from "next/router";

import useTranslation from "next-translate/useTranslation";
import {
    ComponentDocumentDocuments,
    Document as DocumentType,
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
import _ from "underscore";
import { isSameYear } from "date-fns";
import { DefHeader, LayoutProps } from "types/global";
import { fetchHydration, getHeader, useHydrater } from "state/layout";
interface Props {
    data: DocumentType;
    locale: string;
}

type Control = {
    data: ComponentDocumentDocuments[];
};

const DocumentControl = ({ data }: Control) => {
    const { t } = useTranslation("document");
    const { setDocument, document, goBackward, goForward } = useDocument();

    const [currentDocument, setCurrentDocument] = useState(data[0]);
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

const DocumentView = ({ data, header, footer }: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    const { t, lang } = useTranslation("document");

    const document = data.document as ComponentDocumentDocuments[];

    const docs = _.chain(document)
        .sortBy("date")
        .sortBy("current")
        .reverse()
        .value();

    const handleChangePage = ({ limit, offset }: PageOptions) => {
        return docs.slice(offset, offset + limit).map((doc) => ({
            label: doc.name,
            date: isSameYear(new Date(), new Date(doc.date))
                ? getDate(doc.date, "dd MMM", lang)
                : getDate(doc.date, "dd MMM yy", lang),
            type: doc.category?.name,
            url: doc.file?.url,
            archive: doc.archived ? t("boolean.true") : t("boolean.false"),
            current: doc.current ? t("boolean.true") : t("boolean.false"),
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
                                    label: t("tableHeader.date"),
                                    id: "date",
                                },
                                {
                                    label: t("tableHeader.current"),
                                    id: "current",
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
                    <DocumentControl data={docs} />
                    <Document />
                </Flex>
            </DocumentContainer>
        </Flex>
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
                        }
                        archived
                        current
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
