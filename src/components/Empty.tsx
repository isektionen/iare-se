import { Center, Heading } from "@chakra-ui/react";
import React from "react";

interface IEmpty {
    title: string;
}

export const Empty = ({ title }: IEmpty) => {
    return (
        <Center w="full">
            <Heading size="lg">{title}</Heading>
        </Center>
    );
};
