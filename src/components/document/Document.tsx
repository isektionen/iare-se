import { useDocument } from "hooks/use-document";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
    Document as BaseDocument,
    Page as BasePage,
    PageProps as BasePageProps,
} from "react-pdf";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "@chakra-ui/react";

const paginate = (pagination: number) =>
    [...Array(pagination)].map((el, idx) => idx + 1);

interface Props {
    infinite?: boolean;
}
export const Document = (props: Props) => {
    const { document, onLoadSuccess } = useDocument();
    const getPages = (p: number) =>
        paginate(p).map((idx) => (
            <BasePage
                key={"page_" + idx}
                pageNumber={idx}
                customTextRenderer={(layer) => {
                    return (
                        <span data-item-index={layer.itemIndex}>
                            {layer.str}
                        </span>
                    );
                }}
            />
        ));
    const [pg, setpg] = useState(1);
    const [pages, setPages] = useState<ReactNode[]>(
        getPages(props.infinite ? 3 : 0)
    );
    const [_window, setWindow] = useState();
    const [height, setHeight] = useState(540);

    useEffect(() => {
        if (window && process.browser) {
            setHeight(window.innerHeight);
        }
    }, []);

    return (
        <Box h={height}>
            <BaseDocument file={document.href} onLoadSuccess={onLoadSuccess}>
                {props.infinite && (
                    <InfiniteScroll
                        height={"100vh"}
                        dataLength={pages.length}
                        next={() => {
                            const pages = getPages(3 * (pg + 1));
                            setPages(pages);
                            setpg(pg + 1);
                        }}
                        hasMore={document.pages !== pages.length}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {pages}
                    </InfiniteScroll>
                )}
                {!props.infinite && (
                    <BasePage
                        pageNumber={document.currentPage}
                        height={height}
                    />
                )}
            </BaseDocument>
        </Box>
    );
};
