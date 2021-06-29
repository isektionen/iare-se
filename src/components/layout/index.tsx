import React, { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";
import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import { HeaderProps } from "types/header";
import { FooterProps } from "types/footer";

interface Props {
    children: ReactNode;
    header: HeaderProps;
    footer: FooterProps;
}

const Layout = (props: Props) => {
    return (
        <>
            <Header {...props.header} />
            <Meta />
            <Flex
                w="full"
                px={{ base: 4, md: 12 }}
                bg="gray.50"
                h="full"
                flexDir="column"
                pos="relative"
            >
                {props.children}
            </Flex>
            <Footer {...props.footer} />
        </>
    );
};

export default Layout;
