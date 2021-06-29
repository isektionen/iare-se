import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    IconButton,
    Spacer,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { MdChatBubble } from "react-icons/md";
import { MenuListItem } from "types/global";
import { LanguageItem } from "types/header";
import { LanguageMenu } from "./LanguageMenu";
import { MobileMenuItem } from "./MobileMenuItem";

interface Props {
    menuList: MenuListItem[];
    languages: LanguageItem[];
    mediaQuery: {
        isLg?: boolean;
        isMd?: boolean;
    };
    contact: string;
}

export const MobileNavigation = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <IconButton
                aria-label="Menu"
                icon={<HiOutlineMenuAlt3 />}
                variant="ghost"
                fontSize="3xl"
                onClick={onOpen}
            />
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement="right"
                size="md"
                closeOnEsc
                closeOnOverlayClick
                blockScrollOnMount
                autoFocus={false}
            >
                <DrawerOverlay />

                <DrawerContent>
                    <Flex w="full" justify="flex-end" px={7} pt={4}>
                        <IconButton
                            aria-label="Menu"
                            icon={<IoCloseCircle />}
                            variant="ghost"
                            fontSize="3xl"
                            onClick={onClose}
                        />
                    </Flex>
                    <DrawerBody>
                        <Flex
                            direction="column"
                            justify="space-between"
                            h="full"
                        >
                            {props.menuList.map((menuItem, key) => (
                                <MobileMenuItem {...menuItem} key={key} />
                            ))}
                            <Spacer />
                            <Flex direction="column">
                                <LanguageMenu
                                    standardLanguage={props.languages[0]}
                                    languages={props.languages}
                                    mediaQuery={props.mediaQuery}
                                    isMobile
                                />
                                <Button
                                    mt={2}
                                    variant="iareSolid"
                                    leftIcon={<MdChatBubble />}
                                >
                                    {props.contact}
                                </Button>
                            </Flex>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};
