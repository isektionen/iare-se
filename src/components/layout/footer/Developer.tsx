import useTranslation from "next-translate/useTranslation";
import { Text } from "@chakra-ui/layout";
import React from "react";

export const Developer = () => {
    const { t } = useTranslation("common");
    return <Text>{t("footer.developer")}</Text>;
};
