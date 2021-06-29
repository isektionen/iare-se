import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { MenuListItem } from "types/global";
import { MenuItem } from "./MenuItem";

type Props = {
    menuList: MenuListItem[];
};
export const NavigationMenu = (props: Props) => {
    return (
        <Flex justify="space-evenly" minW="50%">
            {props.menuList.map((menu) => (
                <MenuItem key={menu.title} {...menu} />
            ))}
        </Flex>
    );
};
