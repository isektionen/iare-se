import { Box, Circle, Flex, HStack, SimpleGrid } from "@chakra-ui/layout";
import Image from "next/image";
import AccessibleLink from "components/AccessibleLink";
import {
    Button,
    chakra,
    Icon,
    Spacer,
    useDisclosure,
    Text,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    useBreakpointValue,
} from "@chakra-ui/react";
import { ComponentHeaderMenuSection } from "../../types/strapi";
import { DefHeader } from "types/global";
import { useViewportScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { mergeLink } from "utils/mergeHref";
import React from "react";
import strapi, { gql } from "lib/strapi";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { availableIcons } from "utils/icon";
import { LinkComponent } from "components/LinkComponent";
import { MdChatBubble } from "react-icons/md";
import { LanguageMenu } from "./navigation/LanguageMenu";
import useTranslation from "next-translate/useTranslation";
import router from "next/router";
import { IoCloseCircle } from "react-icons/io5";
import { MobileMenuItem } from "./navigation/MobileMenuItem";
import { Flyout } from "./navigation/Flyout";
import { Logo } from "./navigation/NavLogo";
import { Section } from "./navigation/Section";

const getHeader = async () => {
    const { data } = await strapi.query<{ header: DefHeader }>({
        query: gql`
            query {
                header {
                    locale
                    logo {
                        alternativeText
                        width
                        height
                        url
                    }
                    sections {
                        id
                        label
                        displayDropDown
                        href
                        subSection {
                            id
                            label
                            href
                            description
                            icon
                            color
                        }
                    }
                    languages {
                        label
                        code
                    }
                    contact {
                        label
                        href
                    }
                    localizations {
                        locale
                        logo {
                            alternativeText
                            width
                            height
                            url
                        }
                        sections {
                            id
                            label
                            displayDropDown
                            href
                            subSection {
                                id
                                label
                                href
                                description
                                icon
                                color
                            }
                        }
                        languages {
                            label
                            code
                        }
                        contact {
                            label
                            href
                        }
                    }
                }
            }
        `,
    });

    if (data) {
        return data.header;
    }
};

const Header = () => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const [header, setHeader] = useState<DefHeader>();

    const { scrollY } = useViewportScroll();
    const [y, setY] = useState(0);

    const ref = useRef<HTMLHeadingElement>(null);
    const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

    useEffect(() => {
        (async () => {
            setHeader(await getHeader());
        })();
    });

    useEffect(() => {
        return scrollY.onChange(() => setY(scrollY.get()));
    }, [scrollY]);

    const contactVariants = useBreakpointValue({
        base: "",
        lg: header?.contact.label,
    });

    const currentLanguage = useMemo(
        () => header?.languages.find((l) => l.code === "se"),
        [header?.languages]
    );
    if (!header) {
        return <></>;
    }

    const { logo, sections, languages, contact } = header;

    return (
        <React.Fragment>
            <chakra.header
                ref={ref}
                py={4}
                bg="white"
                position="sticky"
                transition="box-shadow 0.3s"
                w="full"
                maxH={16}
                zIndex={3}
                top={0}
                left={0}
                right={0}
                px={{ base: 4, md: 12 }}
                shadow={y > height ? "base" : undefined}
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mx="auto"
                >
                    <AccessibleLink href="/">
                        <Logo logo={logo} />
                    </AccessibleLink>
                    <Box display={{ base: "none", md: "inline-flex" }} ml={10}>
                        <HStack spacing={1}>
                            {sections.map((section) => (
                                <Section
                                    key={"section" + section.id}
                                    {...section}
                                />
                            ))}
                        </HStack>
                    </Box>
                    <Spacer />
                    <Flex alignItems="center">
                        <HStack spacing={1}>
                            <LanguageMenu
                                standardLanguage={currentLanguage}
                                languages={languages}
                                size="sm"
                                display={{ base: "none", md: "flex" }}
                            />
                            <LinkComponent
                                as={Button}
                                size="sm"
                                href={contact.href}
                                leftIcon={<MdChatBubble />}
                                isDisabled={true}
                                display={{ base: "none", md: "flex" }}
                            >
                                {contactVariants}
                            </LinkComponent>
                            <IconButton
                                size="sm"
                                display={{ base: "flex", md: "none" }}
                                aria-label="Menu"
                                icon={<AiOutlineMenu />}
                                variant="ghost"
                                fontSize="xl"
                                onClick={onOpen}
                            />
                        </HStack>
                    </Flex>
                </Flex>
            </chakra.header>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement="right"
                size="sm"
                closeOnEsc
                closeOnOverlayClick
                blockScrollOnMount
                autoFocus={false}
            >
                <DrawerOverlay />

                <DrawerContent>
                    <Flex w="full" justify="flex-end" px={3} pt={4}>
                        <IconButton
                            aria-label="Menu"
                            icon={<IoCloseCircle />}
                            variant="ghost"
                            fontSize="xl"
                            onClick={onClose}
                        />
                    </Flex>
                    <DrawerBody>
                        <Flex
                            direction="column"
                            justify="space-between"
                            h="full"
                        >
                            {sections?.map((section) => (
                                <MobileMenuItem
                                    key={section.id}
                                    section={section}
                                    onClose={onClose}
                                />
                            ))}
                            <Spacer />
                            <Flex direction="column">
                                <LanguageMenu
                                    standardLanguage={currentLanguage}
                                    languages={languages}
                                    isMobile
                                />

                                <LinkComponent
                                    href={contact.href}
                                    as={Button}
                                    mt={2}
                                    variant="iareSolid"
                                    leftIcon={<MdChatBubble />}
                                    isDisabled={true}
                                >
                                    {contact.label}
                                </LinkComponent>
                            </Flex>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    );
};

export default Header;
