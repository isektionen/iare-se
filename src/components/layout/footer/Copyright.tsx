import { getYear } from "date-fns";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Text } from "@chakra-ui/react";

export const Copyright = () => {
    const { t } = useTranslation("common");
    const year = getYear(new Date());
    return <Text>&#169; {t("footer.copyright", { year })}</Text>;
};
