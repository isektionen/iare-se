import { Flex } from "@chakra-ui/react";
import React from "react";
import { getDate } from "utils/dates";

interface Props {
    label: string;
    createdAt: string;
}

export const DocumentListItem = (props: Props) => {
    return (
        <Flex justify="space-between">
            <p>{props.label}</p>
            <p>{getDate(props.createdAt, "yyyy-mm-dd")}</p>
        </Flex>
    );
};
