import React, { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";
import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import { FooterProps } from "types/footer";
import { DefHeader, DefFooter } from "types/global";

interface Props {
    header: DefHeader;
    footer: DefFooter;
    children: ReactNode;
}

const Layout = (props: Props) => {
    return (
        <VStack>
            <Header {...props.header} />
            <Meta />
            <Flex
                w="full"
                bg="gray.50"
                h="full"
                flexDir="column"
                pos="relative"
            >
                {props.children}
            </Flex>
            <Footer
                {...{ ...props.footer, sections: props.header?.sections ?? [] }}
            />
        </VStack>
    );
};

export default Layout;
