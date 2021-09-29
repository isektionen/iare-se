import { VStack, Text } from "@chakra-ui/react";
import React from "react";

interface IColor {
    name: string;
    hex: string;
    rgb?: string;
    size: number | string;
}

export const Color = ({ hex, name, size }: IColor) => {
    return (
        <VStack
            w={size}
            h={size}
            p={4}
            rounded="lg"
            borderWidth={hex.startsWith("#ff") ? "1px" : "0"}
            borderColor="gray.200"
            overflow="hidden"
            justify="stretch"
            bg={hex}
            color={hex.startsWith("#ff") ? "black" : "white"}
            spacing={0.5}
        >
            <Text fontWeight="black" fontSize="lg" w="full">
                {name}
            </Text>
            <Text fontWeight="black" fontSize="lg" w="full">
                {hex.toUpperCase()}
            </Text>
        </VStack>
    );
};
