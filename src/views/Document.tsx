import { Box, Wrap, WrapItem } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { DocumentContainer } from "components/document/DocumentContainer";
import { ItemThumbnail } from "components/document/ItemThumbnail";
import { SearchBar } from "components/document/SearchBar";
import { Empty } from "components/Empty";
import { ClientError } from "components/Error";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { isMobile } from "react-device-detect";
import { useFuseFilter } from "state/document";
import { useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { makeTitle } from "utils/seo";
import {
    ComponentDocumentDocuments,
    Document as DocumentType,
} from "../types/strapi";

interface Props {
    data: DocumentType;
    locale: string;
}

const View = ({ data, header, footer, error }: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    const { t, lang } = useTranslation("document");

    const documents = useFuseFilter(
        (data?.document as unknown as ComponentDocumentDocuments[]) ?? []
    );

    const sizeVariant = useBreakpointValue({ base: 200, md: 120 }) as number;

    if (error) {
        return <ClientError />;
    }
    return (
        <React.Fragment>
            <NextSeo title={makeTitle(t("seo:document.title"))} />
            <DocumentContainer />
            <Box py={16} px={{ base: 3, md: 16 }}>
                <SearchBar />
                <Wrap
                    w="full"
                    spacing={4}
                    justify={
                        isMobile || documents.length === 0
                            ? "center"
                            : "flex-start"
                    }
                >
                    {documents.length === 0 && (
                        <Empty title="No Documents found" />
                    )}
                    {documents.length > 0 &&
                        [...documents].reverse().map((d, i) => (
                            <WrapItem key={"thumbnail-" + i}>
                                <ItemThumbnail {...d} size={sizeVariant} />
                            </WrapItem>
                        ))}
                </Wrap>
            </Box>
        </React.Fragment>
    );
};

export default View;
