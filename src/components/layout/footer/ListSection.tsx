import { Box, Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { MenuListItem } from "types/global";
import { LinkList } from "./LinkList";

interface Props {
    menuList: MenuListItem[];
}

export const ListSection = (props: Props) => {
    return (
        <Grid
            templateRows={{ base: "repeat(2, 1fr)", lg: "repeat(1, 1fr)" }}
            templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={4}
            w="full"
        >
            {props.menuList.map((menu, key) => (
                <GridItem key={key} colSpan={1} rowSpan={1}>
                    <LinkList {...menu} />
                </GridItem>
            ))}
        </Grid>
    );
};
