import { useDocument } from "hooks/use-document";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Document as BaseDocument, Page as BasePage } from "react-pdf";
import {
    Box,
    Center,
    Flex,
    Skeleton,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useWindow } from "hooks/use-window";

const paginate = (pagination: number) =>
    [...Array(pagination)].map((el, idx) => idx + 1);

interface Props {
    infinite?: boolean;
}
const Document = (props: Props) => {
    const { document, onLoadSuccess } = useDocument();

    const [loading, setLoading] = useState(true);
    const variant = useBreakpointValue({ base: 0.7, md: 0.35 }) as number;
    const { width: baseWidth } = useWindow();

    const width = baseWidth * variant;
    const height = width * Math.SQRT2;
    return (
        <Flex justify="center" align="center" h="full" w="full">
            <BaseDocument
                file={document.href}
                onSourceSuccess={() => setLoading(true)}
                onLoadSuccess={(pdf) => {
                    onLoadSuccess(pdf);
                    setLoading(false);
                }}
                loading={""}
            >
                <Skeleton isLoaded={!loading} width={width} height={height}>
                    <Flex justify="center" align="center" bg="white">
                        <BasePage
                            pageNumber={document.currentPage}
                            height={height}
                        />
                    </Flex>
                </Skeleton>
            </BaseDocument>
        </Flex>
    );
};

export default Document;
