import { Button } from "@chakra-ui/button";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    chakra,
    AspectRatio,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    HStack,
    Placement,
    useBreakpointValue,
    SlideDirection,
} from "@chakra-ui/react";
import { WrapPadding } from "components/browser/WrapPadding";
import {
    DocumentContext,
    DocumentType,
    NewDocumentType,
} from "hooks/use-document";
import useTranslation from "next-translate/useTranslation";
import React, {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { isMobile } from "react-device-detect";
import { useDocumentContext } from "state/document";

const Document = ({ file }: { file?: string }) => {
    useEffect(() => {
        const node = document.getElementById("pdfiframe") as HTMLIFrameElement;
        if (node) {
            node.contentWindow?.location.reload();
        }
    }, [file]);
    return (
        <AspectRatio h="full" ratio={1 / Math.SQRT2}>
            <iframe
                id="pdfiframe"
                frameBorder="0"
                allowFullScreen
                scrolling="auto"
                src={`https://docs.google.com/viewer?url=${file}&embedded=true`}
            />
        </AspectRatio>
    );
};

export const DocumentContainer = () => {
    const { onClose, isOpen, file, title } = useDocumentContext();
    const { t } = useTranslation("document");
    const placementVariant = useBreakpointValue({
        base: "left",
        md: "right",
    }) as SlideDirection;

    return (
        <Drawer
            isOpen={isOpen}
            placement={placementVariant}
            size={isMobile ? "full" : "lg"}
            onClose={onClose}
            isFullHeight
            onEsc={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <WrapPadding>
                    <DrawerCloseButton />
                    <DrawerHeader>{title}</DrawerHeader>

                    <DrawerBody>{file && <Document file={file} />}</DrawerBody>

                    <DrawerFooter>
                        <HStack spacing={2}>
                            {file && (
                                <Button
                                    as="a"
                                    variant="iareSolid"
                                    href={file}
                                    download={title}
                                    target="_blank"
                                >
                                    {t("thumbnail.drawer.download")}
                                </Button>
                            )}
                            <Button variant="outline" mr={3} onClick={onClose}>
                                {t("thumbnail.drawer.close")}
                            </Button>
                        </HStack>
                    </DrawerFooter>
                </WrapPadding>
            </DrawerContent>
        </Drawer>
    );
};
