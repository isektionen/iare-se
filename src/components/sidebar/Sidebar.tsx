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
        <VStack spacing={6} h="full" py={4} minW={14} px={{ base: 2, md: 12 }}>
            <Pages routes={routes} />
            <Categories w="full" items={categories} />
        </VStack>
    );
};
