import { useDocument } from "hooks/use-document";
import React, { ReactNode, useEffect, useState } from "react";
import { Document as BaseDocument, Page as BasePage } from "react-pdf";
import { Box, Skeleton } from "@chakra-ui/react";
import { useWindow } from "hooks/use-window";

const paginate = (pagination: number) =>
    [...Array(pagination)].map((el, idx) => idx + 1);

interface Props {
    infinite?: boolean;
}
export const Document = (props: Props) => {
    const { document, onLoadSuccess } = useDocument();

    const [loading, setLoading] = useState(true);

    const { height } = useWindow();

    const width = height / Math.SQRT2;
    return (
        <Box h={height} w={width}>
            <BaseDocument
                file={document.href}
                onSourceSuccess={() => setLoading(true)}
                onLoadSuccess={(pdf) => {
                    onLoadSuccess(pdf);
                    setLoading(false);
                }}
                loading={""}
            >
                <Skeleton isLoaded={!loading} height={height} width={width}>
                    <BasePage
                        pageNumber={document.currentPage}
                        height={height}
                    />
                </Skeleton>
            </BaseDocument>
        </Box>
    );
};
