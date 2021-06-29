import { Flex, List, ListItem, Text } from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import React from "react";
import { MenuListItem } from "types/global";

export const MobileMenuItem = (props: MenuListItem) => {
    return (
        <Flex direction="column" mb={4}>
            <Text as="h6" fontSize="xl" w="full" fontWeight="bold">
                {props.title}
            </Text>
            <List pl={8} spacing={1}>
                {props.listItems &&
                    props.listItems.map((item, key) => (
                        <ListItem key={key}>
                            <AccessibleLink href={item.href}>
                                {item.name}
                            </AccessibleLink>
                        </ListItem>
                    ))}
            </List>
        </Flex>
    );
};
