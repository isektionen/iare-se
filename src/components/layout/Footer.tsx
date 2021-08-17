import { Button, Divider, Flex, Spacer } from "@chakra-ui/react";
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

const Footer = () => {
    const { t } = useTranslation("common");
    return (
        <Flex
            as="footer"
            width="full"
            py={12}
            px={{ base: 4, md: 12 }}
            direction="column"
        >
            <Flex>
                <Logo />
                <Spacer />
                <Button
                    bg="white"
                    variant="outline"
                    rightIcon={<BsBoxArrowUp />}
                >
                    {t("footer.contact")}
                </Button>
            </Flex>
            <Divider my={16} borderColor="gray.100" />

            <NewsLetter />
            <Divider my={16} borderColor="gray.100" />
            <Flex></Flex>
        </Flex>
    );
};

export default Footer;
