import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { MenuListItem } from "types/global";

export const MenuItem = (props: MenuListItem) => {
    return (
        <Flex px={2} align="center">
            {props.title}
            {props.dropDownMenu && <Icon ml={5} as={FaAngleDown} />}
        </Flex>
    );
};
