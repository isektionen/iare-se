import { VStack } from "@chakra-ui/react";
import { Breadcrumb } from "components/Breadcrumb";
import React from "react";

export const Summary = () => {
    const path = [{ label: "Aktuellt", href: "/blog" }];
    return (
        <VStack
            bg="white"
            pos="relative"
            align="start"
            spacing={8}
            w="full"
            px={{ base: 3, md: 16 }}
            pt={{ base: 4, md: 10 }}
            pb={{ base: 8, md: 16 }}
        >
            <Breadcrumb path={path} />
        </VStack>
    );
};
