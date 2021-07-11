import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
    label: string;
    value: string | string[];
}

export const TicketInfoItem = (props: Props) => {
    return (
        <Flex direction="column" w="full">
            <Text
                as="h6"
                fontSize={16}
                textTransform="capitalize"
                fontWeight="bold"
                color="gray.300"
            >
                {props.label}
            </Text>
            <Text as="p" fontWeight="semibold" fontSize={14}>
                {props.value}
            </Text>
        </Flex>
    );
};
