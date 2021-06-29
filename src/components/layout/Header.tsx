import { Box, Flex, Text } from "@chakra-ui/layout";
import Image from "next/image";
import AccessibleLink from "components/AccessibleLink";
import {
    IconButton,
    Spacer,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import { NavigationMenu } from "./navigation/NavigationMenu";
import { HeaderProps } from "types/header";
import customTheme from "styles/customTheme";
import { NavigationButtons } from "./navigation/NavigationButtons";
import { BigNavigation } from "./navigation/BigNavigation";
import { MobileNavigation } from "./navigation/MobileNavigation";

const Header = (props: HeaderProps) => {
    const [isLg] = useMediaQuery(`(min-width: ${customTheme.breakpoints.lg})`);
    const [isMd] = useMediaQuery(`(min-width: ${customTheme.breakpoints.md})`);
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
                            <NavigationMenu menuList={props.menuList} />
                            <Spacer />
                            <NavigationButtons
                                contact={props.contact}
                                mediaQuery={{ isLg, isMd }}
                                languages={props.languages}
                            />
                        </>
                    )}
                    {!isMd && (
                        <MobileNavigation
                            menuList={props.menuList}
                            contact={props.contact}
                            languages={props.languages}
                            mediaQuery={{ isLg, isMd }}
                        />
                    )}
                </Flex>
            </Box>
            {isMd && (
                <BigNavigation
                    mediaQuery={{ isLg }}
                    subMenuList={props.menuList[1].listItems}
                />
            )}
        </>
    );
};

export default Header;
