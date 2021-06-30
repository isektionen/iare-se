import { Flex, Spacer } from "@chakra-ui/react";
import { useRecoilSSRValue } from "components/RecoilSSR";
import React from "react";
import { footerState } from "state/layout";
import { Branding } from "./footer/Branding";
import { ListSection } from "./footer/ListSection";
import { Social } from "./footer/Social";

const Footer = () => {
    const [data, isLoading, hasError] = useRecoilSSRValue(footerState);
    if (isLoading) return <div>Loading...</div>;
    if (data) {
        const { responsiblePublisher, menuList } = data;
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
                <Branding responsiblePublisher={responsiblePublisher} />
                <Spacer />
                <Flex
                    direction="column"
                    pt={{ base: 10, lg: 0 }}
                    pos="relative"
                >
                    <ListSection menuList={menuList} />
                    <Social />
                </Flex>
            </Flex>
        );
    }
};

export default Footer;
