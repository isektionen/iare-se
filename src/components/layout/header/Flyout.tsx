import { SimpleGrid, Circle, Icon, Text } from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import Box from "components/motion/Box";
import React from "react";
import { ComponentHeaderMenuSection } from "types/strapi";
import { availableIcons } from "utils/icon";
import { mergeLink } from "utils/mergeHref";

export const Flyout = ({ subSection, href }: ComponentHeaderMenuSection) => (
    <React.Fragment>
        <SimpleGrid
            borderTopColor="gray.50"
            borderWidth="1px"
            columns={{ base: 1, md: 3 }}
            pos="relative"
            bg="white"
            shadow="lg"
            gap={{ base: 6, sm: 8 }}
            px={5}
            py={6}
            p={{ sm: 8 }}
        >
            {subSection &&
                subSection.map((section, i) => {
                    if (section) {
                        const CustomIcon = availableIcons(section.icon);

                        return (
                            <AccessibleLink
                                key={"flyout-section-" + i}
                                href={mergeLink(href, section.href)}
                                m={-3}
                                p={3}
                                display="flex"
                                alignItems="start"
                                rounded="lg"
                                _hover={{ bg: "gray.50" }}
                            >
                                <Circle
                                    w={10}
                                    h={10}
                                    mr={4}
                                    bg={`${section.color}.200`}
                                >
                                    <Icon as={CustomIcon} />
                                </Circle>
                                <Box ml={4}>
                                    <Text
                                        fontSize="sm"
                                        fontWeight="700"
                                        color="gray.900"
                                    >
                                        {section.label}
                                    </Text>
                                    {section.description && (
                                        <Text
                                            fontSize="sm"
                                            fontWeight="500"
                                            color="gray.500"
                                        >
                                            {section.description}
                                        </Text>
                                    )}
                                </Box>
                            </AccessibleLink>
                        );
                    }
                    return <></>;
                })}
        </SimpleGrid>
    </React.Fragment>
);
