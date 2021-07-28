import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

interface Props {
    responsiblePublisher: string;
}

export const Branding = (props: Props) => {
    const { t } = useTranslation();
    return (
        <Box alignSelf={{ base: "center", lg: "flex-start" }} w="full">
            <Box maxW={{ base: "full", lg: "174px" }} pb={{ base: 8, lg: 0 }}>
                <Image
                    src="/footer-logo.svg"
                    width={174}
                    height={79}
                    alt="Logo"
                    layout="responsive"
                />
            </Box>
            <Text>
                {t("common:brandingCopyright", {
                    year: new Date().getFullYear(),
                })}
            </Text>
            <Flex
                pt={4}
                direction={{ base: "row", lg: "column" }}
                w="full"
                justify="space-between"
            >
                <Text>
                    {t("common:responsibleAuthor", {
                        name: props.responsiblePublisher,
                    })}
                </Text>
                <Text>{t("common:responsibleMaintainer")}</Text>
            </Flex>
        </Box>
    );
};
