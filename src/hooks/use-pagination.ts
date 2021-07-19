import React, { createContext, useContext } from "react";

export type PaginationButtonProps = "forward" | "backward";

export interface PaginationContext {
    currentPage: number;
    pageQuantity: number;
    itemsPerPage: number;
    changePage: (page: number) => void;
    getButtonProps: (type: PaginationButtonProps) => {
        "aria-label": string;
        isDisabled: boolean;
        onClick: () => void;
    };
    currentItems: any[];
}

export const PaginationContext = createContext<PaginationContext>({
    currentPage: 1,
    pageQuantity: 1,
    itemsPerPage: 1,
    changePage: () => {},
    getButtonProps: () => {
        return {
            "aria-label": "string",
            isDisabled: false,
            onClick: () => {},
        };
    },
    currentItems: [],
});

export const usePagination = () => useContext(PaginationContext);
