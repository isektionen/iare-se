import { Flex, Spacer } from "@chakra-ui/react";
import { useRecoilSSRValue } from "components/RecoilSSR";
import React from "react";
import { footerState } from "state/layout";
import { DefFooter, DefHeader } from "types/global";
import { ComponentHeaderMenuSection } from "types/strapi";
import { Branding } from "./footer/Branding";
import { ListSection } from "./footer/ListSection";
import { Social } from "./footer/Social";

interface Props extends DefFooter {
    sections: ComponentHeaderMenuSection[];
}

const Footer = (props: Props) => {
    return (
        <Flex
            as="footer"
            width="full"
            bg="gray.50"
            pt={8}
            pb={12}
            px={{ base: 4, md: 12 }}
            direction={{ base: "column-reverse", lg: "row" }}
        >
            <Branding
                responsiblePublisher={`${props.responsiblePublisher.firstname} ${props.responsiblePublisher.lastname}`}
            />
            <Spacer />
            <Flex direction="column" pt={{ base: 10, lg: 0 }} pos="relative">
                <ListSection sections={props.sections} />
                <Social socials={props.social} />
            </Flex>
        </Flex>
    );
};

export default Footer;
