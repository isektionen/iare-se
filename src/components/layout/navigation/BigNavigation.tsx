import { Box, Flex, Grid, GridItem, HStack } from "@chakra-ui/react";
import AccessibleLinkOverlay from "components/AccessibleLinkOverlay";
import { useRecoilSSRValue } from "components/RecoilSSR";
import { MenuSection, SectionItem } from "hooks/use-menu";
import React, { Dispatch, SetStateAction } from "react";
import { menuState } from "state/layout";
import { ListItemProp } from "types/global";
import {
    ComponentHeaderMenuSection,
    ComponentHeaderSubSection,
} from "types/strapi";
import { mergeLink } from "utils/mergeHref";
import { BigNavigationMenuCard } from "./BigNavigationMenuCard";
import { BigNavigationNewsCard } from "./BigNavigationNewsCard";

interface Props {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    delayedSetIsOpen: (value: boolean) => void;
    mediaQuery: {
        isMd?: boolean;
        isLg?: boolean;
    };
    activeSection: ComponentHeaderMenuSection | undefined;
}

export const BigNavigation = (props: Props) => {
    return (
        <>
            {props.isOpen && (
                <Box
                    bg="rgba(0,0,0,0.1)"
                    h="full"
                    w="full"
                    pos="absolute"
                    zIndex={10}
                    top={16}
                    onMouseLeave={() => {
                        props.delayedSetIsOpen(false);
                    }}
                >
                    <Flex
                        px={{ base: 4, md: 12 }}
                        py={4}
                        bg="gray.50"
                        borderTop="#CCC 1px solid"
                        direction="row"
                        h={56}
                        align="stretch"
                        onMouseEnter={() => props.setIsOpen(true)}
                    >
                        <Grid
                            w={{ base: "full", lg: "67%" }}
                            templateColumns="repeat(3,1fr)"
                            templateRows="repeat(2,1fr)"
                        >
                            {props.activeSection &&
                                props.activeSection.subSection &&
                                props.activeSection.subSection.map(
                                    (section, key) => {
                                        return (
                                            <GridItem
                                                key={section?.id ?? key}
                                                rowSpan={1}
                                                colSpan={1}
                                            >
                                                {section && (
                                                    <AccessibleLinkOverlay
                                                        href={mergeLink(
                                                            props.activeSection
                                                                .href,
                                                            section.href
                                                        )}
                                                    >
                                                        <BigNavigationMenuCard
                                                            {...section}
                                                        />
                                                    </AccessibleLinkOverlay>
                                                )}
                                            </GridItem>
                                        );
                                    }
                                )}
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
                    <Box h="full" onMouseEnter={() => props.setIsOpen(false)} />
                </Box>
            )}
        </>
    );
};
