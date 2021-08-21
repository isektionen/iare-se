import {
    Box,
    BoxProps,
    Button,
    Center,
    Divider,
    Flex,
    HStack,
    Spacer,
    Stack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { NewsLetter } from "./footer/NewsLetter";
import { Social } from "./footer/Social";
import { Logo } from "./footer/Logo";
import { Copyright } from "./footer/Copyright";
import { Developer } from "./footer/Developer";
import { Privacy } from "./footer/Privacy";
import { Publisher } from "./footer/Publisher";
import { PageSection } from "./footer/PageSection";
import { Contact } from "./footer/Contact";

const Footer = (props: BoxProps) => {
    const { t } = useTranslation("common");
    return (
        <Flex as="footer" width="full" pb={12} direction="column" {...props}>
            <Flex py={12}>
                <Logo />
                <Flex
                    justifySelf="stretch"
                    w="full"
                    flex={1}
                    align="center"
                    mx={8}
                >
                    <Divider borderColor="gray.100" />
                </Flex>
                <Contact />
            </Flex>

            <Flex w="full" direction={{ base: "column-reverse", lg: "row" }}>
                <PageSection />
                <Spacer />
                <NewsLetter />
            </Flex>
            <Divider
                my={12}
                borderColor="gray.100"
                borderBottomWidth={{ base: "0px", lg: "1px" }}
            />
            <Flex
                color="gray.600"
                direction={{ base: "column-reverse", lg: "row" }}
                align="center"
                justify="center"
            >
                <Stack
                    spacing={2}
                    direction={{ base: "column", lg: "row" }}
                    textAlign={{ base: "center", lg: "left" }}
                >
                    <Copyright />
                    <Privacy />
                    <Publisher />
                </Stack>
                <Spacer />
                <Social />
            </Flex>
            <Center color="gray.600" w="full" mt={6}>
                <Developer />
            </Center>
        </Flex>
    );
};

export default Footer;
