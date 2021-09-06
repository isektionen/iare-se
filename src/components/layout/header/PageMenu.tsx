import {
    Box,
    Button,
    Heading,
    HStack,
    List,
    ListItem,
    VStack,
} from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import { HorizontalScroll } from "components/HorizontalScroll";
import { LinkComponent } from "components/LinkComponent";
import React, { useMemo } from "react";
import { usePageHydrate } from "state/layout";

export const PageMenu = () => {
    const { items, viewports } = usePageHydrate();
    if (items.length === 0 || !viewports?.includes("header")) {
        return <React.Fragment></React.Fragment>;
    }
    return (
        <HorizontalScroll w="67%" overflowX="scroll" pb={2}>
            {items.map((item) => (
                <LinkComponent
                    as={Button}
                    key={"section" + item.label}
                    href={item.href}
                    bg="white"
                    color="gray.600"
                    alignItems="center"
                    size="sm"
                    fontSize="sm"
                    _hover={{ color: "gray.900" }}
                    _focus={{ boxShadow: "none" }}
                >
                    {item.label}
                </LinkComponent>
            ))}
        </HorizontalScroll>
    );
};

export const PageMenuMobile = () => {
    const { label, items, viewports } = usePageHydrate();
    if (!viewports?.includes("drawer")) {
        return <React.Fragment />;
    }
    return (
        <Box py={2} maxH="33%" w="full">
            <Heading size="sm" mb={2}>
                {label}
            </Heading>
            <List
                pt={4}
                pl={4}
                spacing={2}
                fontSize="md"
                color="gray.600"
                maxH="80%"
                overflowY="scroll"
            >
                {items.map((item) => {
                    if (item) {
                        return (
                            <ListItem
                                key={"footer-section-listitem-" + item?.label}
                            >
                                <AccessibleLink href={item?.href}>
                                    {item?.label}
                                </AccessibleLink>
                            </ListItem>
                        );
                    }
                    return <></>;
                })}
            </List>
        </Box>
    );
};
