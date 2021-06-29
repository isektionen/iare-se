import { Box, List, ListItem, Text } from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import React from "react";
import { MenuListItem } from "types/global";

export const LinkList = (props: MenuListItem) => {
    return (
        <Box pr={{ base: 8, lg: 20 }}>
            <Text as="h6" fontSize="xl" w="full" fontWeight="bold">
                {props.title}
            </Text>
            <List>
                {props.listItems.map((item, key) => (
                    <ListItem key={key}>
                        <AccessibleLink href={item.href}>
                            {item.name}
                        </AccessibleLink>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
