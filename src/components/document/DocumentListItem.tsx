import { Flex } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { getDate } from "utils/dates";

interface Props {
    label: string;
    createdAt: string;
}

export const DocumentListItem = (props: Props) => {
    const { lang } = useTranslation();
    return (
        <Flex justify="space-between">
            <p>{props.label}</p>
            <p>{getDate(props.createdAt, "yyyy-mm-dd", lang)}</p>
        </Flex>
    );
};
