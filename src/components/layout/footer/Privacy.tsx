import { Text } from "@chakra-ui/layout";
import AccessibleLink from "components/AccessibleLink";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export const Privacy = () => {
    const { t } = useTranslation("common");
    return (
        <AccessibleLink href="/legal/privacy-policy">
            <Text>{t("footer.privacyPolicy")}</Text>
        </AccessibleLink>
    );
};
