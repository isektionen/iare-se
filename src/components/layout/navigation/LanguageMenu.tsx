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

interface Props {
    standardLanguage: {
        code: string;
        name: string;
    };
    isMobile?: boolean;
    languages: LanguageItem[];
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
                    <MenuButton
                        isActive={isOpen}
                        as={Button}
                        rightIcon={<FaAngleDown />}
                        variant="outline"
                    >
                        <HStack>
                            <Image
                                src={`/${props.standardLanguage.code}.svg`}
                                width={22}
                                height={12}
                                alt={props.standardLanguage.name}
                            />
                            <span>
                                {props.mediaQuery.isLg ||
                                    (props.isMobile &&
                                        props.standardLanguage.name)}
                            </span>
                        </HStack>
                    </MenuButton>
                    <MenuList>
                        {props.languages.map((lang) => (
                            <MenuItem key={lang.code}>
                                <HStack>
                                    <Image
                                        src={`/${lang.code}.svg`}
                                        width={22}
                                        height={12}
                                        alt={lang.name}
                                    />
                                    <span>{lang.name}</span>
                                </HStack>
                            </MenuItem>
                        ))}
                    </MenuList>
                </>
            )}
        </Menu>
    );
};
