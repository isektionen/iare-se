import React, { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";
import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import { FooterProps } from "types/footer";
import { DefHeader, DefFooter } from "types/global";
import useTranslation from "next-translate/useTranslation";
import { isMobile } from "react-device-detect";

interface Props {
    //header: DefHeader;
    //footer: DefFooter;
    children: ReactNode;
}

const Layout = (props: Props) => {
    return (
        <VStack overflowX="hidden" align="stretch">
            <Header px={{ base: 4, md: 12 }} />
            <Meta />
            <Box bg="white" w="100vw">
                {props.children}
            </Box>
            <Footer px={{ base: 4, md: 12 }} />
        </VStack>
    );
};

export default Layout;
