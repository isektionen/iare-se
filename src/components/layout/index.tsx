import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, VStack } from "@chakra-ui/react";

interface Props {
    children: ReactNode;
}

const Layout = (props: Props) => {
    return (
        <VStack align="stretch" position="relative">
            <Header px={{ base: 4, md: 12 }} />
            {/* WARNING! USING 100vw won't account the scrollbar and will therefore add a horizontal scrollbar */}
            <Box bg="white" w="100%" pt={16}>
                {props.children}
            </Box>
            <Footer px={{ base: 4, md: 12 }} />
        </VStack>
    );
};

export default Layout;
