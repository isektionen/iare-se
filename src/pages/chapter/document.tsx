import strapi, { gql, axios } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";

import { useRouter } from "next/router";

import useTranslation from "next-translate/useTranslation";
import loadNamespaces from "next-translate/loadNamespaces";
import {
    ComponentDocumentActionDocument,
    ComponentDocumentContractDocument,
    ComponentDocumentControlDocument,
    ComponentDocumentFormDocument,
    ComponentDocumentProtocolDocument,
    Document as DocType,
    DocumentAllDocumentsDynamicZone,
} from "../../types/strapi";
import { DocumentContainer } from "../../components/document/DocumentContainer";
import { Document } from "components/document/Document";
import { useDocument } from "hooks/use-document";

import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton,
    Text,
} from "@chakra-ui/react";
import { LayoutWrapper } from "components/layout/LayoutWrapper";
import React, { useEffect, useState } from "react";

import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from "react-icons/io";
import { DocumentCard } from "components/document/DocumentCard";
import { getDate } from "utils/dates";
import { DocumentListItem } from "components/document/DocumentListItem";
interface Props {
    document: DocType;
    locale: string;
}

type ExtendedDoc = { __component: string };

interface Grouped {
    protocol: (ComponentDocumentProtocolDocument & ExtendedDoc)[];
    action: (ComponentDocumentActionDocument & ExtendedDoc)[];
    form: (ComponentDocumentFormDocument & ExtendedDoc)[];
    control: (ComponentDocumentControlDocument & ExtendedDoc)[];
    contract: (ComponentDocumentContractDocument & ExtendedDoc)[];
}

const makeHref = (url: string | undefined) => {
    const base = process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL;
    if (base && url) {
        return base + url;
    }
};

const DocumentControl = ({ data }: { data: DocType }) => {
    const { setDocument, document, goBackward, goForward } = useDocument();

    const [currentDocument, setCurrentDocument] = useState(
        data.currentRegulations
    );
    useEffect(() => {
        if (currentDocument) {
            const href = makeHref(currentDocument.file?.url);
            setDocument({ href });
        }
    }, [currentDocument]);
    return (
        <Flex
            position="absolute"
            zIndex={5}
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
                {document.currentPage || 1} av {document.pages}
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

const groupDocuments = (data: DocType): Grouped => {
    const minimize = (key: string) => {
        const match = key.match(/document\.(.+)-document/);
        if (match) {
            return match[1];
        }
        return key;
    };
    const addToGroup = (group: any, doc: any) => {
        const key = minimize(doc.__component);
        if (group.hasOwnProperty(doc.__component)) {
            return {
                ...group,
                [key]: [...group[key], doc],
            };
        }
        return { ...group, [key]: [doc] } as Grouped;
    };
    return data.allDocuments.reduce(addToGroup, {} as unknown as any);
};

const DocumentView = ({ locale, document: data }: Props) => {
    const router = useRouter();
    const { t } = useTranslation("common");

    const groupedDocuments = groupDocuments(data);
    return (
        <LayoutWrapper>
            <DocumentContainer loading={"LOADING"} fallback={"NO PDF"}>
                <Flex
                    bg="gray.50"
                    flex={1}
                    order={{ base: 1, md: 0 }}
                    justify="center"
                    direction="column"
                    p={4}
                    h="full"
                >
                    <Box>
                        <Heading as="h2" size="lg" mb={8}>
                            Huvuddokument
                        </Heading>
                        <Flex
                            direction="row"
                            justify={{ base: "flex-start", lg: "space-evenly" }}
                            w="full"
                            wrap={{ base: "wrap", lg: "nowrap" }}
                        >
                            <DocumentCard
                                isCurrent
                                label={data.currentStatute?.label}
                                url={makeHref(data.currentStatute?.file?.url)}
                                createdAt={
                                    data.currentStatute?.file?.created_at
                                }
                            />
                            <DocumentCard
                                isCurrent
                                label={data.currentRegulations?.label}
                                url={makeHref(
                                    data.currentRegulations?.file?.url
                                )}
                                createdAt={
                                    data.currentRegulations?.file?.created_at
                                }
                            />
                            <DocumentCard
                                isCurrent
                                label={data.currentFinancialReport?.label}
                                url={makeHref(
                                    data.currentFinancialReport?.file?.url
                                )}
                                createdAt={
                                    data.currentFinancialReport?.file
                                        ?.created_at
                                }
                            />
                        </Flex>
                    </Box>
                    <Box>
                        <Heading as="h2" size="lg" mb={8}>
                            Styrdokument
                        </Heading>
                        {groupedDocuments.control.map((doc) => (
                            <DocumentListItem
                                key={doc.__component + doc.id}
                                label={doc.documentContent?.label ?? ""}
                                createdAt={
                                    doc.documentContent?.file?.created_at ?? ""
                                }
                            />
                        ))}
                    </Box>
                    <Box>
                        <Heading as="h2" size="lg" mb={8}>
                            Handlingar
                        </Heading>
                        {groupedDocuments.action.map((doc) => (
                            <DocumentListItem
                                key={doc.__component + doc.id}
                                label={doc.documentContent?.label ?? ""}
                                createdAt={
                                    doc.documentContent?.file?.created_at ?? ""
                                }
                            />
                        ))}
                    </Box>
                    <Box>
                        <Heading as="h2" size="lg" mb={8}>
                            Protokoll
                        </Heading>
                        {groupedDocuments.protocol.map((doc) => (
                            <DocumentListItem
                                key={doc.__component + doc.id}
                                label={doc.documentContent?.label ?? ""}
                                createdAt={
                                    doc.documentContent?.file?.created_at ?? ""
                                }
                            />
                        ))}
                    </Box>
                    <Box>
                        <Heading as="h2" size="lg" mb={8}>
                            Avtal
                        </Heading>
                        {groupedDocuments.contract.map((doc) => (
                            <DocumentListItem
                                key={doc.__component + doc.id}
                                label={doc.documentContent?.label ?? ""}
                                createdAt={
                                    doc.documentContent?.file?.created_at ?? ""
                                }
                            />
                        ))}
                    </Box>
                </Flex>
                <Flex
                    order={{ base: 0, md: 1 }}
                    bg="gray.200"
                    flex={1}
                    position="relative"
                    justify="center"
                    p={4}
                >
                    <DocumentControl data={data} />
                    <Document />
                </Flex>
            </DocumentContainer>
        </LayoutWrapper>
    );
};

export const getStaticProps: GetStaticProps = async ({
    locales,
    defaultLocale,
}) => {
    const locale = "en";
    const { data } = await axios.get("/document?_locale=" + locale);
    return {
        props: {
            locale,
            ...(await loadNamespaces({
                locales,
                defaultLocale,
                locale,
                pathname: "/chapter/document",
            })),
            document: data,
        },
    };
};

export default DocumentView;
