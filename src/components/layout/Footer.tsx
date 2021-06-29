import { Flex, Link, Text, Spacer, Box } from "@chakra-ui/react";
import { FooterProps } from "types/footer";
import { Branding } from "./footer/Branding";
import { ListSection } from "./footer/ListSection";
import { Social } from "./footer/Social";

const Footer = (props: FooterProps) => {
    console.log(props);
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
            <Branding responsiblePublisher={props.responsiblePublisher} />
            <Spacer />
            <Flex direction="column" pt={{ base: 10, lg: 0 }} pos="relative">
                <ListSection menuList={props.menuList} />
                <Social />
            </Flex>
        </Flex>
    );
};

export default Footer;
