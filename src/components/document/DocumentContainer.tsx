import {
    DocumentContext,
    DocumentType,
    NewDocumentType,
} from "hooks/use-document";
import React, {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

interface DocumentProps {
    children: ReactNode;
    loading: ReactNode;
    fallback: ReactNode;
}

export const DocumentContainer = (props: DocumentProps) => {
    const { loading, fallback } = props;
    const [documentState, _setDocument] = useState<DocumentType>({
        href: undefined,
        currentPage: undefined,
        pages: undefined,
    });

    const setDocument = (newDocument: NewDocumentType) => {
        _setDocument({
            href: newDocument?.href ?? documentState.href,
            currentPage: newDocument.currentPage || 1,
            pages: newDocument?.pages ?? documentState.pages,
        });
    };

    const goForward = useCallback(() => {
        if (
            documentState.currentPage &&
            documentState.pages &&
            documentState.currentPage < documentState.pages
        ) {
            setDocument({
                currentPage: documentState.currentPage + 1,
            });
        }
    }, [documentState]);

    const changePage = useCallback(
        (pageNumber: number) => {
            if (documentState.pages && pageNumber < documentState.pages)
                setDocument({ currentPage: pageNumber });
        },
        [documentState]
    );

    const goBackward = useCallback(() => {
        if (
            documentState.currentPage &&
            documentState.pages &&
            documentState.currentPage > 0
        ) {
            setDocument({
                currentPage: documentState.currentPage - 1,
            });
        }
    }, [documentState]);

    const onLoadSuccess = useCallback(
        ({ _pdfInfo }) => {
            const { numPages } = _pdfInfo;
            setDocument({ pages: numPages });
        },
        [documentState.href]
    );

    const value = {
        document: documentState,
        setDocument,
        goForward,
        goBackward,
        loading,
        fallback,
        onLoadSuccess,
        search: () => console.warn("DEPRECATED UNTIL FURTHER AGREEMENT"),
    };
    return (
        <DocumentContext.Provider value={value}>
            {props.children}
        </DocumentContext.Provider>
    );
};
