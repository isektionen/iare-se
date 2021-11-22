import React, { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import { AlertSection } from "./AlertSection";

interface Props {
    children: ReactNode;
}

const Layout = (props: Props) => {
    return (
        <VStack
            align="stretch"
            //overflowX="hidden"
            position="relative"
        >
            <Header px={{ base: 4, md: 12 }} />
            <Box bg="white" w="100vw" pt={16}>
                {props.children}
            </Box>
            <Footer px={{ base: 4, md: 12 }} />
        </VStack>
    );
};

export default Layout;
