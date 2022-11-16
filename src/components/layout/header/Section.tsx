import { Box } from "@chakra-ui/layout";
import { Button, chakra } from "@chakra-ui/react";
import { LinkComponent } from "components/LinkComponent";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { ComponentHeaderMenuSection } from "types/strapi";
import { Flyout } from "./Flyout";

export const Section = (section: ComponentHeaderMenuSection) => {
    const sectionSpecificName = "Musikhjälpen";
    const linearGradient =
        "linear-gradient(90deg, rgba(255,30,30,1) 0%, rgba(201,0,0,1) 100%)";

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
                    pt={4}
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
            fontFamily={
                section.label === sectionSpecificName ? "Courier New" : ""
            }
            bg={
                section.label === sectionSpecificName ? linearGradient : "white"
            }
            color={section.label === sectionSpecificName ? "white" : "gray.600"}
            alignItems="center"
            fontSize="md"
            _hover={{
                color:
                    section.label === sectionSpecificName
                        ? "white"
                        : "gray.900",
                bg: section.label === sectionSpecificName ? linearGradient : "",
            }}
            _focus={{ boxShadow: "none" }}
        >
            {section.label}
        </LinkComponent>
    );
};
