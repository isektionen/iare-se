import { Box, BoxProps, Flex, HStack, List, ListItem } from "@chakra-ui/layout";
import AccessibleLink from "components/AccessibleLink";
import {
    Text,
    Button,
    chakra,
    Icon,
    Spacer,
    useDisclosure,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    useBreakpointValue,
    VStack,
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { LinkComponent } from "components/LinkComponent";
import { MdChatBubble } from "react-icons/md";
import { LanguageMenu } from "./header/LanguageMenu";
import { IoCloseCircle } from "react-icons/io5";
import { MobileMenuItem } from "./header/MobileMenuItem";
import { Logo } from "./header/Logo";
import { Section } from "./header/Section";
import { useRecoilValue } from "recoil";
import { headerState, layout } from "state/layout";
import { Feedback } from "./header/Feedback";
import useTranslation from "next-translate/useTranslation";
import { PageMenu, PageMenuMobile } from "./header/PageMenu";
import MotionBox from "components/motion/Box";
import { BsPlus } from "react-icons/bs";
import { mergeLink } from "utils/mergeHref";
import _ from "underscore";
import { useRouter } from "next/router";

const Header = (props: BoxProps) => {
    const router = useRouter();
    const { lang } = useTranslation();
    const { languages, contact, sections } = useRecoilValue(
        layout({ section: "header", lang })
    );
    const { onClose, onOpen, isOpen } = useDisclosure();

    const { scrollY } = useViewportScroll();
    const [y, setY] = useState(0);

    const ref = useRef<HTMLHeadingElement>(null);
    const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

    useEffect(() => {
        return scrollY.onChange(() => setY(scrollY.get()));
    }, [scrollY]);

    const contactVariants = useBreakpointValue({
        base: "",
        lg: contact.label,
    });

    const currentLanguage = useMemo(
        () => languages.find((l) => l.code === "se"),
        [languages]
    );

    const defaultIndex = _.chain(sections)
        .pluck("href")
        .findIndex((path) => router.asPath.includes(path))
        .value();

    return (
        <React.Fragment>
            <chakra.header
                ref={ref}
                pt={4}
                bg="white"
                position="fixed"
                transition="box-shadow 0.3s"
                w="full"
                //maxH={16}
                zIndex={11}
                top={0}
                left={0}
                right={0}
                shadow={y > height ? "base" : undefined}
                {...props}
            >
                <Flex
                    alignItems="flex-start"
                    justifyContent="space-between"
                    mx="auto"
                    pb={2}
                >
                    <AccessibleLink href="/">
                        <Logo priority />
                    </AccessibleLink>
                    <Box
                        display={{ base: "none", md: "inline-flex" }}
                        ml={10}
                        maxW="67%"
                    >
                        <VStack spacing={0} w="full" align="stretch">
                            <HStack spacing={1}>
                                {sections.map((section, i) => (
                                    <Section
                                        key={"section-" + i}
                                        {...section}
                                    />
                                ))}
                            </HStack>
                            <PageMenu />
                        </VStack>
                    </Box>
                    <Spacer />
                    <Flex alignItems="center">
                        <HStack spacing={2}>
                            <Feedback />
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
                                display={{ base: "none", md: "flex" }}
                            >
                                <Icon
                                    as={MdChatBubble}
                                    mr={{ base: 0, lg: 2 }}
                                />
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
                size="xs"
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
                            <PageMenuMobile />
                            <Accordion
                                flex={1}
                                allowToggle
                                defaultIndex={defaultIndex}
                            >
                                {sections.map(
                                    ({ subSection, href, label }, i) => {
                                        const _subSection =
                                            subSection?.map((item) => ({
                                                ...item,
                                                href: mergeLink(
                                                    href,
                                                    item?.href as string
                                                ) as string,
                                            })) ?? [];

                                        const variants = {
                                            open: {
                                                rotate: 45,
                                            },
                                            close: {
                                                rotate: -45,
                                            },
                                        };
                                        if (
                                            _subSection &&
                                            _subSection.length === 0
                                        ) {
                                            return (
                                                <React.Fragment
                                                    key={
                                                        i +
                                                        "accordionitem-" +
                                                        href
                                                    }
                                                ></React.Fragment>
                                            );
                                        }
                                        return (
                                            <AccordionItem
                                                key={
                                                    i + "accordionitem-" + href
                                                }
                                                borderTopWidth="0 !important"
                                                borderBottomWidth="0 !important"
                                            >
                                                {({ isExpanded }) => (
                                                    <Flex
                                                        borderBottomWidth="1px"
                                                        direction="column"
                                                        borderColor="gray.100"
                                                    >
                                                        <AccordionButton>
                                                            <Flex
                                                                align="center"
                                                                w="full"
                                                                flex={1}
                                                                justify="space-between"
                                                            >
                                                                <Text
                                                                    fontWeight="700"
                                                                    size="lg"
                                                                >
                                                                    {label}
                                                                </Text>
                                                                <MotionBox
                                                                    display="flex"
                                                                    justifyContent="center"
                                                                    alignItems="center"
                                                                    animate={
                                                                        isExpanded
                                                                            ? "open"
                                                                            : "closed"
                                                                    }
                                                                    variants={
                                                                        variants
                                                                    }
                                                                >
                                                                    <Icon
                                                                        as={
                                                                            BsPlus
                                                                        }
                                                                        boxSize={
                                                                            5
                                                                        }
                                                                    />
                                                                </MotionBox>
                                                            </Flex>
                                                        </AccordionButton>

                                                        <AccordionPanel>
                                                            <List
                                                                spacing={2}
                                                                fontSize="md"
                                                                color="gray.600"
                                                            >
                                                                {_subSection &&
                                                                    _subSection.map(
                                                                        (
                                                                            item
                                                                        ) => {
                                                                            if (
                                                                                item
                                                                            ) {
                                                                                return (
                                                                                    <ListItem
                                                                                        onClick={
                                                                                            onClose
                                                                                        }
                                                                                        key={
                                                                                            "footer-section-listitem-" +
                                                                                            item?.id
                                                                                        }
                                                                                    >
                                                                                        <AccessibleLink
                                                                                            href={
                                                                                                item?.href
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                item?.label
                                                                                            }
                                                                                        </AccessibleLink>
                                                                                    </ListItem>
                                                                                );
                                                                            }
                                                                            return (
                                                                                <>

                                                                                </>
                                                                            );
                                                                        }
                                                                    )}
                                                            </List>
                                                        </AccordionPanel>
                                                    </Flex>
                                                )}
                                            </AccordionItem>
                                        );
                                    }
                                )}
                            </Accordion>
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
                                    isFullWidth
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
