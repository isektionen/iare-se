import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    Center,
    Button,
    Flex,
    VStack,
    HStack,
    Text,
    Spacer,
} from "@chakra-ui/react";
import { NextImage } from "components/NextImage";
import { motion, useCycle } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import { TicketData } from "pages/event/[slug]";
import React, { useCallback, useMemo, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";

interface Props {
    orderData: TicketData | undefined;
}

export const OrderComplete = ({ orderData }: Props) => {
    const { t } = useTranslation("ticket");

    const [showTicket, setShowTicket] = useState(
        orderData?.skipMessage ?? false
    );
    const alertContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            type: "spring",
            transition: {
                staggerChildren: 0.3,
            },
        },
    };
    const alertItem = {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
    };

    const MotionAlert = motion(Alert);
    const MotionBox = motion(Box);
    const MotionAlertTitle = motion(AlertTitle);
    const MotionAlertDescription = motion(AlertDescription);
    const MotionCenter = motion(Center);
    const MotionFlex = motion(Flex);

    if (showTicket && orderData) {
        return (
            <MotionFlex
                direction="column"
                w="full"
                minH="550px"
                justifyContent="center"
                align="center"
                p={6}
            >
                <Center w="full">
                    <NextImage
                        src={orderData.qrcode}
                        width={225}
                        height={225}
                    />
                </Center>
                <Text color="gray.600">{orderData.intentionId}</Text>

                <Spacer />

                <VStack mt={6} spacing={6} w="full" align="stretch">
                    <HStack justify="space-between">
                        <Text fontWeight={700}>{t("infoLabel.name")}</Text>
                        <Text color="gray.600">
                            {orderData.firstName + " " + orderData.lastName}
                        </Text>
                    </HStack>

                    <HStack justify="space-between">
                        <Text fontWeight={700}>{t("infoLabel.diets")}</Text>
                        <Text color="gray.600">
                            {orderData.diets && orderData.diets.length > 0
                                ? orderData.diets
                                      ?.map((d) => d.label)
                                      .join(", ")
                                : t("noDiets")}
                        </Text>
                    </HStack>

                    <HStack justify="space-between">
                        <Text fontWeight={700}>{t("infoLabel.allergens")}</Text>
                        <Text color="gray.600">
                            {orderData.allergens &&
                            orderData.allergens.length > 0
                                ? orderData.allergens
                                      ?.map((d) => d.label)
                                      .join(", ")
                                : t("noAllergens")}
                        </Text>
                    </HStack>
                </VStack>
            </MotionFlex>
        );
    }
    return (
        <MotionAlert
            w="full"
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            minH="550px"
            variants={alertContainer}
            initial="hidden"
            animate="show"
        >
            <MotionBox
                initial={{ y: 0 }}
                animate={{
                    y: -5,
                    transition: {
                        type: "tween",
                        repeatType: "mirror",
                        duration: 0.8,
                        repeat: Infinity,
                    },
                }}
            >
                <AlertIcon boxSize="40px" mr={0} />
            </MotionBox>
            <MotionAlertTitle mt={4} mb={1} fontSize="lg" variants={alertItem}>
                {t("success.heading")}
            </MotionAlertTitle>
            <MotionAlertDescription maxWidth="sm" variants={alertItem}>
                {t("success.description", { email: orderData?.email ?? "---" })}
            </MotionAlertDescription>
            <MotionCenter mt={10} variants={alertItem}>
                <Button
                    variant="iareSolid"
                    rightIcon={<BsArrowRightShort />}
                    onClick={() => setShowTicket(true)}
                >
                    {t("success.cta")}
                </Button>
            </MotionCenter>
        </MotionAlert>
    );
};
