import React, { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";
import { Box, Container, Flex, VStack } from "@chakra-ui/react";

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
            <Meta />
            <Box bg="white" w="100vw" pt={20}>
                {props.children}
            </Box>
            <Footer px={{ base: 4, md: 12 }} />
        </VStack>
    );
};

export default Layout;
