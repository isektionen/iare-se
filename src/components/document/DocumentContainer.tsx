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
    Spinner,
    Box,
    Center,
    Flex,
    Text,
    VStack,
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
    useRef,
    useState,
} from "react";
import { isMobile } from "react-device-detect";
import { useDocumentContext } from "state/document";

const Document = ({ file }: { file?: string }) => {
    const { t } = useTranslation("document");
    return (
        <AspectRatio h="80vh" ratio={1 / Math.SQRT2}>
            <Box w="full" h="full">
                <object
                    width="100%"
                    height="100%"
                    data={file}
                    type="application/pdf"
                >
                    <iframe
                        src={`https://docs.google.com/viewer?url=${file}&embedded=true`}
                    >
                        <VStack>
                            <Text>{t("thumbnail.drawer.documentFailure")}</Text>
                            {file && (
                                <Button
                                    as="a"
                                    variant="iareSolid"
                                    href={file}
                                    target="_blank"
                                >
                                    {t("thumbnail.drawer.download")}
                                </Button>
                            )}
                        </VStack>
                    </iframe>
                </object>
            </Box>
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
