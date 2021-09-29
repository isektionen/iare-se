import {
    Button,
    Text,
    ButtonProps,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { WrapPadding } from "components/browser/WrapPadding";
import React, { useCallback } from "react";
import { isMobile } from "react-device-detect";
import { IoIosArrowDown } from "react-icons/io";

type Item = {
    value: string;
    isSelected: boolean;
};
interface IContactMenu extends ButtonProps {
    items: Item[];
    setItems: (items: Item[]) => void;
}

export const ContactMenu = ({ items, setItems, ...props }: IContactMenu) => {
    const { onToggle, ...controls } = useDisclosure();

    const selected = items.find((item) => item.isSelected)?.value;

    const handleSelect = useCallback(
        (item: Item) => {
            controls.onClose();
            setItems(
                items.map((_item) => ({
                    ..._item,
                    isSelected: _item.value === item.value,
                }))
            );
        },
        [controls, items, setItems]
    );

    if (isMobile) {
        return (
            <>
                <Button variant="outline" onClick={controls.onOpen} {...props}>
                    <Flex w="full" align="center">
                        <Text textTransform="capitalize">{selected}</Text>
                        <Spacer />
                        <IoIosArrowDown />
                    </Flex>
                </Button>
                <Drawer
                    placement="bottom"
                    {...controls}
                    returnFocusOnClose={false}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>Group</DrawerHeader>

                        <DrawerBody>
                            <WrapPadding>
                                <VStack spacing={2} align="flex-start">
                                    {items.map((item) => (
                                        <Button
                                            textTransform="capitalize"
                                            key={item.value}
                                            variant="ghost"
                                            onClick={() => handleSelect(item)}
                                        >
                                            {item.value}
                                        </Button>
                                    ))}
                                </VStack>
                            </WrapPadding>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        );
    }
    return (
        <Menu {...controls}>
            <MenuButton
                textAlign="left"
                as={Button}
                variant="outline"
                textTransform="capitalize"
                rightIcon={<IoIosArrowDown />}
                {...props}
            >
                {selected}
            </MenuButton>
            <MenuList>
                {items.map((item) => (
                    <MenuItem
                        textTransform="capitalize"
                        key={item.value}
                        onClick={() => handleSelect(item)}
                    >
                        {item.value}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
