import { Box, Flex, Grid, GridItem, HStack } from "@chakra-ui/react";
import React from "react";
import { ListItemProp } from "types/global";
import { BigNavigationMenuCard } from "./BigNavigationMenuCard";
import { BigNavigationNewsCard } from "./BigNavigationNewsCard";

interface Props {
    mediaQuery: {
        isMd?: boolean;
        isLg?: boolean;
    };
    subMenuList: ListItemProp[];
}

export const BigNavigation = (props: Props) => {
    return (
        <Box bg="rgba(0,0,0,0.1)" h="full" w="full" pos="absolute" zIndex={10}>
            <Flex
                px={{ base: 4, md: 12 }}
                py={4}
                bg="gray.50"
                borderTop="#CCC 1px solid"
                direction="row"
                h={56}
                align="stretch"
            >
                <Grid
                    w={{ base: "full", lg: "67%" }}
                    templateColumns="repeat(3,1fr)"
                    templateRows="repeat(2,1fr)"
                >
                    {props.subMenuList.map((menu, key) => (
                        <GridItem key={key} rowSpan={1} colSpan={1}>
                            <BigNavigationMenuCard {...menu} />
                        </GridItem>
                    ))}
                </Grid>
                {props.mediaQuery.isLg && (
                    <HStack
                        w="33%"
                        alignSelf="flex-start"
                        justify="space-evenly"
                    >
                        <BigNavigationNewsCard />
                        <BigNavigationNewsCard />
                    </HStack>
                )}
            </Flex>
        </Box>
    );
};
