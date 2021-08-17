import { Text } from "@chakra-ui/layout";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useRecoilValue } from "recoil";
import { layout } from "state/layout";

export const Publisher = () => {
    const { t } = useTranslation("common");
    const { responsiblePublisher } = useRecoilValue(layout("footer"));
    return (
        <Text>
            {t("footer.publisher", {
                name:
                    responsiblePublisher.firstname +
                    " " +
                    responsiblePublisher.lastname,
            })}
        </Text>
    );
};
