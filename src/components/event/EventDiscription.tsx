import React from "react";
import { Text } from "@chakra-ui/react";
interface Props {
    description: string;
}

export const EventDiscription = (props: Props) => {
    return <Text pt={4}>{props.description && props.description}</Text>;
};
