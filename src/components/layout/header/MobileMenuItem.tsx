import { Flex, List, ListItem, Text } from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import React from "react";
import { MenuListItem } from "types/global";
import { ComponentHeaderMenuSection } from "types/strapi";

interface Props {
    section: ComponentHeaderMenuSection;
    onClose: () => void;
}

export const MobileMenuItem = (props: Props) => {
    return (
        <Flex direction="column" mb={4}>
            <Text as="h6" fontSize="xl" w="full" fontWeight="bold">
                <AccessibleLink
                    href={props.section.href}
                    afterClick={props.onClose}
                >
                    {props.section.label}
                </AccessibleLink>
            </Text>
            <List pl={8} spacing={1}>
                {props.section.subSection &&
                    props.section.subSection.map((item) => (
                        <ListItem key={item?.id}>
                            <AccessibleLink
                                href={item?.href ?? "#"}
                                afterClick={props.onClose}
                            >
                                {item?.label}
                            </AccessibleLink>
                        </ListItem>
                    ))}
            </List>
        </Flex>
    );
};
