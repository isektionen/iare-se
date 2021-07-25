import { Flex, VStack } from "@chakra-ui/react";
import React from "react";
import { Categories, Category } from "./Categories";
import { Pages, Route } from "./Pages";

interface Props {
    routes: Route[];
    categories: Category[];
}

export const Sidebar = ({ routes, categories }: Props) => {
    return (
        <VStack
            spacing={6}
            h="auto"
            position="sticky"
            bottom="0"
            top="0"
            left="0"
            py={4}
            px={{ base: 2, md: 12 }}
            bg="gray.50"
        >
            <Pages routes={routes} />
            <Categories w="full" items={categories} />
        </VStack>
    );
};
