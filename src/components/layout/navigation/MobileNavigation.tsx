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
import AccessibleLink from "components/AccessibleLink";
import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { MdChatBubble } from "react-icons/md";
import {
    ComponentHeaderContact,
    ComponentHeaderLanguages,
    ComponentHeaderMenuSection,
} from "types/strapi";
import { LanguageMenu } from "./LanguageMenu";
import { MobileMenuItem } from "./MobileMenuItem";
import { useRouter } from "next/router";
import { mergeLink } from "utils/mergeHref";

interface Props {
    sections: ComponentHeaderMenuSection[];
    languages: ComponentHeaderLanguages[];
    mediaQuery: {
        isLg?: boolean;
        isMd?: boolean;
    };
    contact: ComponentHeaderContact;
}

export const MobileNavigation = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
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
                            {props.sections?.map((section) => (
                                <MobileMenuItem
                                    key={section.id}
                                    section={section}
                                    onClose={onClose}
                                />
                            ))}
                            <Spacer />
                            <Flex direction="column">
                                <LanguageMenu
                                    standardLanguage={
                                        props.languages
                                            ? props.languages.find(
                                                  (l) => l.code === "se"
                                              )
                                            : undefined
                                    }
                                    languages={props.languages}
                                    mediaQuery={props.mediaQuery}
                                    isMobile
                                />
                                <Button
                                    mt={2}
                                    variant="iareSolid"
                                    leftIcon={<MdChatBubble />}
                                    isDisabled={true}
                                    onClick={() => {
                                        onClose();
                                        router.push(props.contact.href);
                                    }}
                                >
                                    {props.contact.label}
                                </Button>
                            </Flex>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};
