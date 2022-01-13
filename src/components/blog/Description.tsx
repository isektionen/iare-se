import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {
    text: string;
}

export const Description = ({ text, ...props }: Props) => {
    return (
        <Text fontWeight="bold" {...props}>
            {text}
        </Text>
    );
};
