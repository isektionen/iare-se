import { Box, Flex } from "@chakra-ui/layout";
import Image from "next/image";
import AccessibleLink from "components/AccessibleLink";
import { Spacer, useMediaQuery } from "@chakra-ui/react";
import { NavigationMenu } from "./navigation/NavigationMenu";
import { HeaderProps } from "types/header";
import customTheme from "styles/customTheme";
import { NavigationButtons } from "./navigation/NavigationButtons";
import { BigNavigation } from "./navigation/BigNavigation";
import { MobileNavigation } from "./navigation/MobileNavigation";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { headerState } from "state/layout";

const Header = () => {
    const [isLg] = useMediaQuery(`(min-width: ${customTheme.breakpoints.lg})`);
    const [isMd] = useMediaQuery(`(min-width: ${customTheme.breakpoints.md})`);

    const { menuList, languages, contact } = useRecoilValue(headerState);
    return (
        <>
            <Box px={{ base: 4, md: 12 }} pos="relative" bg="gray.50">
                <Flex py={4} as="header" width="full" align="center">
                    <AccessibleLink href="/">
                        <Image
                            src="/logo.svg"
                            width={77}
                            height={28}
                            alt="Iare Logotype"
                        />
                    </AccessibleLink>
                    <Spacer />
                    {isMd && (
                        <>
                            <NavigationMenu menuList={menuList} />
                            <Spacer />
                            <NavigationButtons
                                contact={contact}
                                mediaQuery={{ isLg, isMd }}
                                languages={languages}
                            />
                        </>
                    )}
                    {!isMd && (
                        <MobileNavigation
                            menuList={menuList}
                            contact={contact}
                            languages={languages}
                            mediaQuery={{ isLg, isMd }}
                        />
                    )}
                </Flex>
            </Box>
            {/*isMd && (
                <BigNavigation
                    mediaQuery={{ isLg }}
                    subMenuList={menuList[1].listItems}
                />
            )*/}
        </>
    );
};

export default Header;
