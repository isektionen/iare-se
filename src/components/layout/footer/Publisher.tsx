import { Text } from "@chakra-ui/layout";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useRecoilValue } from "recoil";
import { layout } from "state/layout";

export const Publisher = () => {
    const { t, lang } = useTranslation("common");
    const {
        representative: { user },
    } = useRecoilValue(layout({ section: "footer", lang }));
    return (
        <Text>
            {t("footer.publisher", {
                name: user.firstname + " " + user.lastname,
            })}
        </Text>
    );
};
