import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertProps,
    AlertTitle,
    CloseButton,
} from "@chakra-ui/react";
import React from "react";
import { useAlertSelector } from "state/layout";

interface Props extends AlertProps {}

export const AlertSection = ({ ...props }: Props) => {
    const { status, description, title, isOpen, isClosable } =
        useAlertSelector();
    if (!isOpen) {
        return <React.Fragment></React.Fragment>;
    }
    return (
        <Alert status={status} w="full" {...props}>
            <AlertIcon />
            <AlertTitle mr={2}>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
            {isClosable && (
                <CloseButton position="absolute" right="8px" top="8px" />
            )}
        </Alert>
    );
};
