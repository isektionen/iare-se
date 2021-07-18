import React, { createContext, ReactNode, useContext } from "react";

export type DocumentType = {
    href: FileHref;
    currentPage: PageType;
    pages: PageType;
};

export type NewDocumentType = {
    href?: FileHref;
    currentPage?: PageType;
    pages?: PageType;
};

type FileHref = string | undefined;
type PageType = number | undefined;
export interface DocumentContextInterface {
    document: DocumentType;
    setDocument: (document: NewDocumentType) => void;
    onLoadSuccess: (pages: PageType) => void;
    onItemClick?: (page: PageType) => void;
    onLoadError?: (error: Error) => void;
    onSourceSuccess?: () => void;
    loading: ReactNode;
    fallback: ReactNode;
    goForward: () => void;
    goBackward: () => void;
    search: (searchText: string) => void;
}

export const DocumentContext = createContext<DocumentContextInterface>({
    document: {
        href: undefined,
        currentPage: undefined,
        pages: undefined,
    },
    onLoadError: () => {},
    onLoadSuccess: () => {},
    onItemClick: () => {},
    onSourceSuccess: () => {},
    loading: "loading",
    fallback: "no data",
    setDocument: () => {},
    goForward: () => {},
    goBackward: () => {},
    search: (a: string) => {},
});

export const useDocument = () => {
    return useContext(DocumentContext);
};
