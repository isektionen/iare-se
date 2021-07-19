import { IconButton } from "@chakra-ui/react";
import { usePagination } from "hooks/use-pagination";
import React, { forwardRef, ReactNode, CSSProperties, useMemo } from "react";
import {
    makeRange,
    makeWindow,
    removeDuplicates,
    separateChildren,
} from "utils/page";

export interface SelectorOptions {
    page: number;
    isActive: boolean;
    onClick: () => void;
}

interface Props {
    children: (options: SelectorOptions) => ReactNode;
    pageSize: number;
    className?: string;
    style?: CSSProperties;
    previous: JSX.Element;
    next: JSX.Element;
}

export const PageSelector = forwardRef<HTMLDivElement, Props>(
    function PageSelector(props, ref) {
        const { currentPage, pageQuantity, getButtonProps, changePage } =
            usePagination();
        /**
         * [
                    currentPage === 1 ? 1 : currentPage - 1,
                    ...makeRange({
                        start: currentPage,
                        end:
                            currentPage + props.pageSize - 2 <= pageQuantity
                                ? currentPage + props.pageSize - 1
                                : pageQuantity,
                    }),
                    pageQuantity,
                ]
         */
        const pages = useMemo(
            () =>
                removeDuplicates<number>(
                    makeWindow(currentPage, pageQuantity, props.pageSize)
                ),
            [props.pageSize, currentPage, pageQuantity]
        );
        if (pageQuantity > 1) {
            return (
                <div ref={ref} className={props.className} style={props.style}>
                    {React.cloneElement(
                        props.previous,
                        getButtonProps("backward")
                    )}
                    {pages.map((page, index) => (
                        <div key={"paginated-page-" + index}>
                            {props.children({
                                page,
                                isActive: currentPage === page,
                                onClick: () => changePage(page),
                            })}
                        </div>
                    ))}
                    {React.cloneElement(props.next, getButtonProps("forward"))}
                </div>
            );
        }
        return <></>;
    }
);
