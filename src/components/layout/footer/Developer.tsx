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
                    href="https://vercel.com?utm_source=isektionen&utm_campaign=oss"
                    isExternal
                    textDecoration="none"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    py={2}
                    px={4}
                    transition="all 0.5s ease-out"
                    rounded="md"
                    _hover={{
                        bg: "black",
                        color: "white",
                    }}
                >
                    Powered by{" "}
                    <chakra.span
                        color={isHover ? "#0070F3" : "black"}
                        transition="color 0.2s ease-in"
                    >
                        ▲
                    </chakra.span>
                    <b>Vercel</b>
                </AccessibleLink>
            </Text>
        </VStack>
    );
};
