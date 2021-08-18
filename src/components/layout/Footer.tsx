import {
    Box,
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
import { BsBoxArrowUp } from "react-icons/bs";
import { DefFooter } from "types/global";
import { ComponentHeaderMenuSection } from "types/strapi";
import { Branding } from "./footer/Branding";
import { ListSection } from "./footer/ListSection";
import { NewsLetter } from "./footer/NewsLetter";
import { Social } from "./footer/Social";
import { Logo } from "./footer/Logo";
import { Copyright } from "./footer/Copyright";
import { Developer } from "./footer/Developer";
import { Privacy } from "./footer/Privacy";
import { Publisher } from "./footer/Publisher";
import { PageSection } from "./footer/PageSection";
import { Contact } from "./footer/Contact";

const Footer = () => {
    const { t } = useTranslation("common");
    return (
        <Flex
            as="footer"
            width="full"
            pb={12}
            px={{ base: 4, md: 12 }}
            direction="column"
        >
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
