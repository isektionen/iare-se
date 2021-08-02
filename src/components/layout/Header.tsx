import { Box, Flex } from "@chakra-ui/layout";
import Image from "next/image";
import AccessibleLink from "components/AccessibleLink";
import { Spacer, useMediaQuery } from "@chakra-ui/react";
import { NavigationMenu } from "./navigation/NavigationMenu";
import customTheme from "styles/customTheme";
import { NavigationButtons } from "./navigation/NavigationButtons";
import { BigNavigation } from "./navigation/BigNavigation";
import { MobileNavigation } from "./navigation/MobileNavigation";
import { useMenu } from "hooks/use-menu";
import {
    ComponentHeaderContact,
    ComponentHeaderMenuSection,
    ComponentHeaderLanguages,
} from "../../types/strapi";
import { DefHeader } from "types/global";
import { imageProvider, imageSource } from "utils/images";
import { useViewportScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { mergeLink } from "utils/mergeHref";

const Header = ({ logo, sections, languages, contact }: DefHeader) => {
    const [isLg] = useMediaQuery(`(min-width: ${customTheme.breakpoints.lg})`);
    const [isMd] = useMediaQuery(`(min-width: ${customTheme.breakpoints.md})`);

    const { useMenuItem, isOpen, activeSection, setIsOpen, delayedSetIsOpen } =
        useMenu();

    const { scrollY } = useViewportScroll();
    const [y, setY] = useState(0);

    const ref = useRef<HTMLHeadingElement>(null);
    const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

    useEffect(() => {
        return scrollY.onChange(() => setY(scrollY.get()));
    }, [scrollY]);

    return (
        <>
            <Box
                ref={ref}
                py={4}
                bg="white"
                as="header"
                position="sticky"
                transition="box-shadow 0.3s"
                w="full"
                maxH={16}
                zIndex={3}
                top={0}
                left={0}
                right={0}
                shadow={y > height ? "base" : undefined}
            >
                <Flex w="full" align="center" h="full" px={{ base: 4, md: 12 }}>
                    <AccessibleLink href="/">
                        <Image
                            src={logo.url}
                            width={77}
                            height={28}
                            alt={logo?.alternativeText ?? "Iare logotype"}
                            priority
                        />
                    </AccessibleLink>
                    <Spacer />
                    {isMd && (
                        <>
                            <NavigationMenu
                                sections={
                                    sections as ComponentHeaderMenuSection[]
                                }
                                setIsOpen={setIsOpen}
                                delayedSetIsOpen={delayedSetIsOpen}
                                useMenuItem={useMenuItem}
                            />
                            <Spacer />
                            <NavigationButtons
                                contact={contact as ComponentHeaderContact}
                                mediaQuery={{ isLg, isMd }}
                                languages={
                                    languages as ComponentHeaderLanguages[]
                                }
                            />
                        </>
                    )}
                    {!isMd && (
                        <MobileNavigation
                            sections={
                                sections.map((section) => ({
                                    ...section,
                                    subSection: section.subSection?.map(
                                        (sub) => ({
                                            ...sub,
                                            href: mergeLink(
                                                section.href,
                                                sub?.href as string
                                            ),
                                        })
                                    ),
                                })) as ComponentHeaderMenuSection[]
                            }
                            contact={contact as ComponentHeaderContact}
                            languages={languages as ComponentHeaderLanguages[]}
                            mediaQuery={{ isLg, isMd }}
                        />
                    )}
                </Flex>
                {isMd && (
                    <BigNavigation
                        isOpen={isOpen}
                        delayedSetIsOpen={delayedSetIsOpen}
                        setIsOpen={setIsOpen}
                        mediaQuery={{ isLg }}
                        activeSection={activeSection}
                    />
                )}
            </Box>
            {isOpen && (
                <Box
                    top={`${height - 10}px`}
                    pos="absolute"
                    bg="rgba(0,0,0,0.1)"
                    bottom={0}
                    h="100%"
                    w="full"
                    zIndex={2}
                ></Box>
            )}
        </>
    );
};

export default Header;
