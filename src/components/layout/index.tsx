import React, { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";
import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import { FooterProps } from "types/footer";
import { DefHeader, DefFooter } from "types/global";
import useTranslation from "next-translate/useTranslation";

interface Props {
    //header: DefHeader;
    //footer: DefFooter;
    children: ReactNode;
}

const Layout = (props: Props) => {
    const { lang } = useTranslation();

    return (
        <VStack align="flex-start" px={{ base: 4, md: 12 }}>
            <Header />
            <Meta />
            <Box bg="white" w="full">
                {props.children}
            </Box>
            <Footer />
        </VStack>
    );
};

export default Layout;
