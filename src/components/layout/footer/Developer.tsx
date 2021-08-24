import useTranslation from "next-translate/useTranslation";
import { Text, VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import AccessibleLink from "components/AccessibleLink";
import { chakra } from "@chakra-ui/system";

export const Developer = () => {
    const { t } = useTranslation("common");

    const [isHover, setHover] = useState(false);
    return (
        <VStack spacing={4}>
            <Text>{t("footer.developer")}</Text>
            <Text>
                <AccessibleLink
                    href="https://vercel.com"
                    isExternal
                    textDecoration="none"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    Powered by{" "}
                    <chakra.span
                        color={isHover ? "#0070F3" : "#000"}
                        transition="all 0.2s ease-in"
                    >
                        ▲ Vercel
                    </chakra.span>{" "}
                </AccessibleLink>
            </Text>
        </VStack>
    );
};
