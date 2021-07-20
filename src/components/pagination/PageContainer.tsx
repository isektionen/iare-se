import { PaginationButtonProps, PaginationContext } from "hooks/use-pagination";
import React, {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

export interface PageOptions {
    limit: number;
    offset: number;
}

interface Props<T> {
    children: ReactNode[] | ReactNode; //(((item: T) => ReactNode) | ReactNode)[];
    initialPage?: number;
    itemsPerPage?: number;
    itemQuantity: number;
    onChangePage: (options: PageOptions) => T[] | T;
}

export const PageContainer = <T extends object>(props: Props<T>) => {
    const { onChangePage } = props;

    const [currentPage, setCurrentPage] = useState<number>(
        props.initialPage || 1
    );

    const [currentItems, setCurrentItems] = useState<T[]>([]);
    const itemsPerPage = useMemo(
        () => props.itemsPerPage || 10,
        [props.itemsPerPage]
    );

    const pageQuantity = useMemo(
        () => Math.ceil(props.itemQuantity / itemsPerPage),
        [props.itemQuantity, itemsPerPage]
    );

    const changePage = useCallback(
        (page: number) => {
            if (page <= pageQuantity && page > 0) {
                setCurrentPage(page);
            }
        },
        [setCurrentPage, pageQuantity]
    );

    const goForward = useCallback(() => {
        changePage(currentPage + 1);
    }, [changePage, currentPage]);

    const goBackward = useCallback(() => {
        changePage(currentPage - 1);
    }, [changePage, currentPage]);

    const getButtonProps = (type: PaginationButtonProps) => {
        switch (type) {
            case "forward":
                return {
                    "aria-label": "Next page",
                    isDisabled: currentPage === pageQuantity,
                    onClick: goForward,
                };
            default:
                return {
                    "aria-label": "Previous page",
                    isDisabled: currentPage === 1,
                    onClick: goBackward,
                };
        }
    };

    useEffect(() => {
        const items = onChangePage({
            limit: itemsPerPage,
            offset: Math.floor((currentPage - 1) * itemsPerPage),
        });
        setCurrentItems(Array.isArray(items) ? items : [items]);
    }, [currentPage, onChangePage, itemsPerPage]);

    return (
        <PaginationContext.Provider
            value={{
                currentPage,
                pageQuantity,
                changePage,
                itemsPerPage,
                getButtonProps,
                currentItems,
            }}
        >
            {/*{externalChildren}
            {currentItems.length > 0 &&
                currentItems.map((item, index) => (
                    <div key={"page-" + index}>{internalChildren(item)}</div>
                ))}*/}
            {props.children}
        </PaginationContext.Provider>
    );
};
