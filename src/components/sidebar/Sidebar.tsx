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
        <VStack spacing={6} h="full" w="25%" py={4} px={12}>
            <Pages w="full" routes={routes} />
            <Categories w="full" items={categories} />
        </VStack>
    );
};
