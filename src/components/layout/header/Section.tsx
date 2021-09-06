import { Box } from "@chakra-ui/layout";
import { Button, chakra } from "@chakra-ui/react";
import { LinkComponent } from "components/LinkComponent";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { ComponentHeaderMenuSection } from "types/strapi";
import { Flyout } from "./Flyout";

export const Section = (section: ComponentHeaderMenuSection) => {
    if (section.displayDropDown) {
        return (
            <Box role="group" key={"section" + section.id}>
                <Button
                    bg="white"
                    color="gray.600"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: "gray.900" }}
                    _focus={{ boxShadow: "none" }}
                    rightIcon={<IoIosArrowDown />}
                >
                    {section.label}
                </Button>
                <Box
                    pt={2}
                    pos="absolute"
                    left={0}
                    w="full"
                    display="none"
                    zIndex={2}
                    _groupHover={{
                        display: "block",
                    }}
                >
                    <Flyout {...section} />
                </Box>
            </Box>
        );
    }
    return (
        <LinkComponent
            as={Button}
            key={"section" + section.id}
            href={section.href}
            bg="white"
            color="gray.600"
            alignItems="center"
            fontSize="md"
            _hover={{ color: "gray.900" }}
            _focus={{ boxShadow: "none" }}
        >
            {section.label}
        </LinkComponent>
    );
};
