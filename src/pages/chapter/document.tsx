import strapi, { gql, axios } from "lib/strapi";
import { GetStaticProps } from "next";

import useTranslation from "next-translate/useTranslation";
import {
    ComponentDocumentDocuments,
    Document as DocumentType,
    Maybe,
} from "../../types/strapi";
import { DocumentContainer } from "../../components/document/DocumentContainer";
import Document from "components/document/Document";

import { useDocument } from "hooks/use-document";

import {
    Box,
    Button,
    Center,
    Flex,
    IconButton,
    SimpleGrid,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { LayoutWrapper } from "components/layout/LayoutWrapper";
import React, { useEffect, useMemo, useState } from "react";

import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from "react-icons/io";

import { getDate } from "utils/dates";
import { DocumentBody, DocumentTable } from "components/document/DocumentTable";
import {
    PageContainer,
    PageOptions,
} from "components/pagination/PageContainer";
import { PageSelector } from "components/pagination/PageSelector";
import { HiOutlineDownload } from "react-icons/hi";

import _ from "underscore";
import { isSameYear } from "date-fns";
import { LayoutProps } from "types/global";
import { fetchHydration, useHydrater } from "state/layout";
import { NextImage } from "components/NextImage";
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

const ItemThumbnail = ({
    file,
    name,
    size = 250,
}: ComponentDocumentDocuments & { size: number }) => {
    const { thumbnail } = file?.formats ?? { thumbnail: undefined };
    return (
        <Box
            p={4}
            rounded="lg"
            bg="gray.50"
            w={60}
            h={64}
            borderColor="gray.100"
            borderWidth="1px"
            shadow="md"
        >
            <Center w="full" p={6}>
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
                </Center>
            </Center>
            <Flex>{name}</Flex>
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
    console.log(documents);
    return (
        <Box>
            <SimpleGrid
                gap={4}
                columns={{ base: 1, md: 2, lg: 3 }}
                alignItems="start"
            >
                {documents.map((d, i) => (
                    <ItemThumbnail key={"thumbnail-" + i} {...d} size={120} />
                ))}
            </SimpleGrid>
        </Box>
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
