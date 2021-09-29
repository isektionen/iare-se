import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Icon,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    useBreakpointValue,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { WrapPadding } from "components/browser/WrapPadding";
import { LinkComponent } from "components/LinkComponent";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { isMobile } from "react-device-detect";
import { IoIosArrowForward } from "react-icons/io";
import _ from "underscore";

interface Role {
    rep: string;
    role: string[];
    href: string[];
}

export const ContactButton = ({ rep, role, href }: Role) => {
    const isAboveMd = useBreakpointValue({ base: true, md: false });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { t } = useTranslation("contact");
    if (isMobile) {
        return (
            <>
                <Button variant="iareSolid" size="xs" pr={2} onClick={onOpen}>
                    {!isAboveMd && t("contact")}
                    <Icon as={IoIosArrowForward} />
                </Button>
                <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>
                            {t("selector.for", { rep })}
                        </DrawerHeader>
                        <DrawerBody>
                            <WrapPadding>
                                <VStack spacing={2} align="flex-start">
                                    {_.zip(role, href).map(([role, href]) => (
                                        <LinkComponent
                                            as={Button}
                                            variant="ghost"
                                            key={href}
                                            href={href}
                                        >
                                            {role}
                                        </LinkComponent>
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
        <Popover trigger="hover" placement="right">
            <PopoverTrigger>
                <Button variant="iareSolid" size="xs" pr={2}>
                    {!isAboveMd && t("contact")}
                    <Icon as={IoIosArrowForward} />
                </Button>
            </PopoverTrigger>
            <PopoverContent w="min-content">
                <PopoverArrow />

                <PopoverBody>
                    <VStack spacing={2} justify="center">
                        {_.zip(role, href).map(([role, href]) => (
                            <LinkComponent
                                as={Button}
                                size="xs"
                                variant="ghost"
                                key={href}
                                href={href}
                            >
                                {role}
                            </LinkComponent>
                        ))}
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
