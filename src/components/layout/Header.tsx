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
    Header as HeaderProps,
    ComponentHeaderSubSection,
} from "../../types/strapi";
import { DefHeader } from "types/global";
import { mergeLink } from "utils/mergeHref";
import { imageSource } from "utils/images";

const Header = ({ logo, sections, languages, contact }: DefHeader) => {
    const [isLg] = useMediaQuery(`(min-width: ${customTheme.breakpoints.lg})`);
    const [isMd] = useMediaQuery(`(min-width: ${customTheme.breakpoints.md})`);

    const { useMenuItem, isOpen, activeSection, setIsOpen, delayedSetIsOpen } =
        useMenu();
    return (
        <>
            <Box
                px={{ base: 4, md: 12 }}
                as="header"
                pos="relative"
                bg="gray.50"
                w="full"
                h={16}
            >
                <Flex py={4} w="full" align="center">
                    <AccessibleLink href="/">
                        <Image
                            src={imageSource(logo.url, "/logo.svg")}
                            width={77}
                            height={28}
                            alt={logo?.alternativeText ?? ""}
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
                            sections={sections as ComponentHeaderMenuSection[]}
                            contact={contact as ComponentHeaderContact}
                            languages={languages as ComponentHeaderLanguages[]}
                            mediaQuery={{ isLg, isMd }}
                        />
                    )}
                </Flex>
            </Box>
            {isMd && (
                <BigNavigation
                    isOpen={isOpen}
                    delayedSetIsOpen={delayedSetIsOpen}
                    setIsOpen={setIsOpen}
                    mediaQuery={{ isLg }}
                    activeSection={activeSection}
                />
            )}
        </>
    );
};

export default Header;
