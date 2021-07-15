import { Box, List, ListItem, Text } from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import React from "react";
import { MenuListItem } from "types/global";
import { ComponentHeaderMenuSection } from "types/strapi";
import { mergeLink } from "utils/mergeHref";

export const LinkList = (props: ComponentHeaderMenuSection) => {
    return (
        <Box pr={{ base: 8, lg: 20 }} w="max-content">
            <Text as="h6" fontSize="xl" w="full" fontWeight="bold">
                {props.label}
            </Text>
            <List>
                {props.subSection &&
                    props.subSection.map((item) => {
                        if (item) {
                            return (
                                <ListItem key={item.id}>
                                    <AccessibleLink
                                        href={mergeLink(props.href, item.href)}
                                    >
                                        {item.label}
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
