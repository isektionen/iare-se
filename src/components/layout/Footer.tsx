import { Flex, Spacer } from "@chakra-ui/react";
import { RecoilSSRValue } from "components/RecoilSSR";
import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { footerState } from "state/layout";
import { Branding } from "./footer/Branding";
import { ListSection } from "./footer/ListSection";
import { Social } from "./footer/Social";

const Footer = () => {
    return (
        <RecoilSSRValue
            recoilValue={footerState}
            fallback={<div>loading...</div>}
        >
            {({ responsiblePublisher, menuList }) => (
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
            )}
        </RecoilSSRValue>
    );
};

export default Footer;
