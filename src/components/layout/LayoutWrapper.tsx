import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const LayoutWrapper = ({ children }: Props) => {
    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            pos="relative"
            minH="560px"
            justify="space-around"
        >
            {children}
        </Flex>
    );
};
