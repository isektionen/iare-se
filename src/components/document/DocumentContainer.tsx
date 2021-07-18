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
import { pdfjs } from "react-pdf";
import Fuse from "fuse.js";

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
    //const [searchResult, setSearchResult] = useState<any[]>([]);

    const setDocument = (newDocument: NewDocumentType) => {
        _setDocument({
            href: newDocument?.href ?? documentState.href,
            currentPage:
                newDocument.href !== documentState.href &&
                !newDocument.currentPage
                    ? 1
                    : newDocument.currentPage,
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
    /*
    const textPagesPromised = useMemo(async () => {
        if (documentState && documentState.href && documentState.pages) {
            const _document = await pdfjs.getDocument(documentState.href)
                .promise;

            const _pagePromises = [...Array(documentState.pages)].map(
                (_, index) => _document.getPage(index + 1)
            );
            const _pages = await Promise.all(_pagePromises);
            const textPages = await Promise.all(
                _pages.map(async (page, pageIndex) => {
                    const content = await page.getTextContent();
                    return content.items.map((item, itemIndex) => ({
                        text: item.str,
                        position: {
                            pageIndex,
                            itemIndex,
                            sx: item.transform[0],
                            sy: item.transform[3],
                            tx: item.transform[4],
                            ty: item.transform[5],
                            width: item.width,
                            height: item.height,
                        },
                    }));
                })
            );
            return textPages.flat();
        }
        return [];
    }, [documentState]);

    const search = useCallback(
        // DEPRECATED UNTIL FURTHER FUNDING
        async (pattern: string) => {
            if (
                documentState &&
                documentState.href &&
                documentState.pages &&
                false
            ) {
                // traverse all pages
                const textPages = await textPagesPromised;
                const fuse = new Fuse(textPages, { keys: ["text"] });
                const result = fuse.search(pattern);
                setSearchResult(result);
            }
        },
        [documentState]
    );

    
    useEffect(() => {
        if (searchResult.length > 0) {
            // TODO: differentiate when plural and singular
            const { item } = searchResult[0];
            const { itemIndex } = item.position;
            const node = document.querySelector(`[data-item-index='${itemIndex}']`);
            node?.scrollIntoView();
        }
    }, [searchResult]);
    */

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
