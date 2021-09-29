import React from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";
import { WrapPadding } from "../../components/browser/WrapPadding";
import { isMobile } from "react-device-detect";
interface IViewMenu {
    current: {
        label: string;
        key: string;
    };
    options: {
        label: string;
        key: string;
    }[];
    setOption: (option: { label: string; key: string }) => void;
}

export const ViewMenu = ({ current, options, setOption }: IViewMenu) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    if (isMobile) {
        return (
            <React.Fragment>
                <Button
                    rightIcon={<IoIosArrowDown />}
                    size="sm"
                    variant="ghost"
                    onClick={onOpen}
                >
                    {current.label}
                </Button>
                <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerBody>
                            <WrapPadding>
                                <VStack spacing={2} align="flex-start">
                                    {options.map((item) => (
                                        <Button
                                            key={item.key}
                                            variant="ghost"
                                            fontWeight={
                                                item.label === current.label
                                                    ? "bold"
                                                    : "normal"
                                            }
                                            onClick={() => {
                                                setOption(item);
                                                onClose();
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </VStack>
                            </WrapPadding>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </React.Fragment>
        );
    }
    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<IoIosArrowDown />}
                size="sm"
                variant="ghost"
            >
                {current.label}
            </MenuButton>
            <MenuList>
                {options.map((item) => (
                    <MenuItem key={item.key} onClick={() => setOption(item)}>
                        {item.label}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
