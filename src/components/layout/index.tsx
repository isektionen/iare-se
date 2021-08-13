import React, { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";
import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import { FooterProps } from "types/footer";
import { DefHeader, DefFooter } from "types/global";
import useTranslation from "next-translate/useTranslation";

interface Props {
    header: DefHeader;
    footer: DefFooter;
    children: ReactNode;
}

const Layout = (props: Props) => {
    const { lang } = useTranslation();
    let header: DefHeader;
    let footer: DefFooter;

    if (lang === props.header.locale) {
        header = props.header;
        footer = props.footer;
    } else {
        header = props.header.localizations.find(
            (l) => l.locale === lang
        ) as DefHeader;
        footer = props.footer.localizations.find(
            (l) => l.locale === lang
        ) as DefFooter;
    }

    return (
        <VStack>
            <Header {...header} />
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
            <Footer {...{ ...footer, sections: header?.sections ?? [] }} />
        </VStack>
    );
};

export default Layout;
