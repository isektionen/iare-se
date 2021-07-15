import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";

import React, { Dispatch, SetStateAction } from "react";

import {
    ComponentHeaderMenuSection,
    ComponentHeaderSubSection,
    Maybe,
} from "types/strapi";
import { MenuItem } from "./MenuItem";

interface Props {
    sections: ComponentHeaderMenuSection[];
    setIsOpen: (value: boolean) => void;
    delayedSetIsOpen: (value: boolean) => void;
    useMenuItem: (props: ComponentHeaderMenuSection) => {
        isActive: boolean;
        onMouseEnter: () => void;
        activeSection: ComponentHeaderMenuSection | undefined;
        isOpen: boolean;
    };
}
export const NavigationMenu = (props: Props) => {
    return (
        <Flex
            minW="40%"
            justify="space-evenly"
            onMouseLeave={() => props.delayedSetIsOpen(false)}
        >
            {props.sections.map((section) => {
                const menuItem = props.useMenuItem(section);
                const allProps = { ...section, ...menuItem };
                return (
                    <MenuItem
                        key={section.id}
                        setIsOpen={props.setIsOpen}
                        {...allProps}
                    />
                );
            })}
        </Flex>
    );
};
