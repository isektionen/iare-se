import { Box, Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { DefHeader, MenuListItem } from "types/global";
import { ComponentHeaderMenuSection } from "types/strapi";
import { LinkList } from "./LinkList";

interface Props {
    sections: ComponentHeaderMenuSection[];
}

export const ListSection = (props: Props) => {
    return (
        <Grid
            templateRows={{ base: "repeat(2, 1fr)", lg: "repeat(1, 1fr)" }}
            templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={4}
            w="full"
        >
            {props.sections.map((section) => (
                <GridItem key={section.id} colSpan={1} rowSpan={1}>
                    <LinkList {...section} />
                </GridItem>
            ))}
        </Grid>
    );
};
