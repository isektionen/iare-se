import { useDisclosure, useOutsideClick } from "@chakra-ui/hooks";
import _ from "lodash";
import React, { useCallback, useMemo, useRef, useState } from "react";

interface IPagination {
    count: number;
    itemsPerPage: number;
    offset?: number;
}

interface IPage {
    label: string | number;
    onClick: () => void;
    index: number;
    isCurrent: boolean;
    type: "page" | "delimiter";
    ref?: any;
}
export const usePagination = ({
    count,
    itemsPerPage,
    offset = 4,
}: IPagination) => {
    const [maxPages, setMaxPages] = useState(
        Math.ceil(count / itemsPerPage) + 1
    );

    const [pageDelta, setPageDelta] = useState(0);
    const [delimiterPages, setDelimiterPages] = useState<IPage[]>();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const goForward = useCallback(() => {
        setPageDelta(Math.min(pageDelta + 1, maxPages - 2));
    }, [maxPages, pageDelta]);
    const goBackward = useCallback(() => {
        setPageDelta(Math.max(pageDelta - 1, 0));
    }, [pageDelta]);

    const goTo = useCallback(
        (index) => {
            setPageDelta(Math.max(0, Math.min(index, maxPages)));
        },
        [maxPages]
    );

    const formatPage: (p: number, i: number) => IPage = useCallback(
        (p: number, i: number) => {
            return {
                label: p,
                index: i,
                onClick: () => goTo(p - 1),
                isCurrent: p - 1 === pageDelta,
                type: "page",
            };
        },
        [goTo, pageDelta]
    );

    const handleDelimiter = useCallback(
        (index: number) => {
            setDelimiterPages(
                _.range(index, maxPages)
                    .slice(0, Math.min(maxPages - 1, 2 * offset))
                    .map(formatPage)
            );
            onOpen();
        },
        [formatPage, maxPages, offset, onOpen]
    );

    const formatDelimiter: (p: number, i: number) => IPage = useCallback(
        (p: number, i: number) => {
            return {
                label: "...",
                index: i,
                onClick: () => handleDelimiter(i),
                isCurrent: false,
                type: "delimiter",
            };
        },
        [handleDelimiter]
    );

    const delimiterRef = useRef<HTMLButtonElement>(null);

    useOutsideClick({
        ref: delimiterRef,
        handler: onClose,
    });

    const pages = useMemo(
        () =>
            [
                ...[1].map(formatPage),
                ..._.range(
                    Math.max(pageDelta - 1, 2),
                    Math.min(pageDelta + offset, Math.max(maxPages - 1, 1))
                )
                    .map(formatPage)
                    .slice(0, offset),
                pageDelta + offset >= maxPages
                    ? null
                    : formatDelimiter(pageDelta + offset, pageDelta + offset),
                ...[maxPages - 1].map(formatPage),
            ].filter((page) => page && page.label > 0) as IPage[],
        [formatDelimiter, formatPage, maxPages, offset, pageDelta]
    );

    const slicer = useMemo(
        () => [
            pageDelta * itemsPerPage,
            pageDelta * itemsPerPage + itemsPerPage,
            pageDelta,
        ],
        [itemsPerPage, pageDelta]
    );

    const onCountChange = useCallback(
        (count: number) => {
            setMaxPages(Math.ceil(count / itemsPerPage));
        },
        [itemsPerPage]
    );

    const isVisible = useMemo(() => count > 1, [count]);

    return {
        goTo,
        goBackward,
        goForward,
        onCountChange,
        pages,
        slicer,
        isDelimiterOpen: isOpen,
        isVisible,
        delimiterPages,
    };
};
