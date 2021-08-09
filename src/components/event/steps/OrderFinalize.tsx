import {
    AspectRatio,
    Box,
    BoxProps,
    Center,
    ScaleFade,
    Skeleton,
    Spinner,
    useBreakpointValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { IConfirmation } from "types/checkout";
import { CheckoutSkeleton } from "../CheckoutSkeleton";
import { EventConfirmation } from "../EventConfirmation";

interface Props extends BoxProps {
    label: string;
    status: string | ("paid" | "unpaid" | null);
    invalidIntention: boolean;
    handleOrder: any;
    isLoaded: boolean;
}

export const OrderFinalize = ({
    invalidIntention,
    status,
    label,
    isLoaded,
    onSubmit,
    ...rest
}: Props) => {
    const { t } = useTranslation("event");

    if (status === "paid") {
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
                onSubmit={(e) => console.log(e)}
                {...rest}
            />
        );
    }
    return (
        <Center pos="relative" w="full" h="calc(100% - 60px)" {...rest}>
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
            <ScaleFade in={isLoaded}>
                <Box id="checkout" />
            </ScaleFade>
        </Center>
    );
};
