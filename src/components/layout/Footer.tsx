import { Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import { DefFooter } from "types/global";
import { ComponentHeaderMenuSection } from "types/strapi";
import { Branding } from "./footer/Branding";
import { ListSection } from "./footer/ListSection";
import { NewsLetter } from "./footer/NewsLetter";
import { Social } from "./footer/Social";

interface Props extends DefFooter {
    sections: ComponentHeaderMenuSection[];
}

const Footer = () => {
    return (
        <Flex
            as="footer"
            width="full"
            pt={8}
            pb={12}
            px={{ base: 4, md: 12 }}
            direction={{ base: "column-reverse", lg: "row" }}
        >
            <NewsLetter />
        </Flex>
    );
};

export default Footer;
