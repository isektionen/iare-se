import { Box, Center, Skeleton, Spinner } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { IConfirmation } from "types/checkout";
import { CheckoutSkeleton } from "../CheckoutSkeleton";
import { EventConfirmation } from "../EventConfirmation";

interface Props {
    label: string;
    orderIsFree: boolean;
    invalidIntention: boolean;
    handleFreeOrder: (orderBody: IConfirmation) => Promise<void>;
    checkoutRef: React.RefObject<HTMLDivElement>;
    isLoaded: boolean;
}

export const Three = ({
    invalidIntention,
    orderIsFree,
    handleFreeOrder,
    label,
    checkoutRef,
    isLoaded,
}: Props) => {
    const { t } = useTranslation("event");

    if (!invalidIntention && orderIsFree) {
        return (
            <EventConfirmation
                title={label}
                firstName={{
                    label: t("orderConfirmation.firstName"),
                    placeholder: "Iaren",
                }}
                lastName={{
                    label: t("orderConfirmation.lastName"),
                    placeholder: "Portersson",
                }}
                email={{
                    label: t("orderConfirmation.email"),
                    placeholder: "iare@kth.se",
                }}
                phoneNumber={{
                    label: t("orderConfirmation.phone"),
                    placeholder: "072-01230123",
                }}
                button={{
                    label: t("orderConfirmation.button.label"),
                }}
                onSubmit={handleFreeOrder}
            />
        );
    }
    return (
        <Box w="full" minH="854px" pos="relative">
            {!isLoaded && (
                <Center
                    position="absolute"
                    left="0"
                    right="0"
                    top="0"
                    bottom="50%"
                    w="full"
                >
                    <Spinner size="xl" pointerEvents="none" />
                </Center>
            )}
            <Box
                opacity={isLoaded ? 1 : 0}
                h="full"
                w="full"
                transitionProperty="opacity"
                transitionDuration="0.5s"
            >
                <Box id="checkout" ref={checkoutRef} />
            </Box>
        </Box>
    );
};
