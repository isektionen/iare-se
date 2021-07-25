import {
    Menu,
    MenuButton,
    HStack,
    MenuList,
    MenuItem,
    Button,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { LanguageItem } from "types/header";
import { ComponentHeaderLanguages } from "types/strapi";

interface Props {
    standardLanguage: ComponentHeaderLanguages | undefined;
    isMobile?: boolean;
    languages: ComponentHeaderLanguages[];
    mediaQuery: {
        isLg?: boolean;
        isMd?: boolean;
    };
}

export const LanguageMenu = (props: Props) => {
    return (
        <Menu>
            {({ isOpen }) => (
                <>
                    {
                        <MenuButton
                            isActive={isOpen}
                            as={Button}
                            rightIcon={<FaAngleDown />}
                            variant="outline"
                        >
                            <HStack>
                                {props.standardLanguage ? (
                                    <>
                                        <Image
                                            src={`/${props.standardLanguage.code}.svg`}
                                            width={22}
                                            height={12}
                                            alt={props.standardLanguage.label}
                                        />
                                        <span>
                                            {props.mediaQuery.isLg ||
                                                (props.isMobile &&
                                                    props.standardLanguage
                                                        .label)}
                                        </span>
                                    </>
                                ) : (
                                    <span>-</span>
                                )}
                            </HStack>
                        </MenuButton>
                    }
                    <MenuList>
                        {props.languages.map((lang) => (
                            <MenuItem key={lang.code}>
                                <HStack>
                                    <Image
                                        src={`/${lang.code}.svg`}
                                        width={22}
                                        height={12}
                                        alt={lang.label}
                                    />
                                    <span>{lang.label}</span>
                                </HStack>
                            </MenuItem>
                        ))}
                    </MenuList>
                </>
            )}
        </Menu>
    );
};
