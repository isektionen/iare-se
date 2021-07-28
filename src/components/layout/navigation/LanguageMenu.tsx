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
import { ComponentHeaderLanguages } from "types/strapi";
import setLanguage from "next-translate/setLanguage";
import i18nConfig from "../../../../i18n";
import useTranslation from "next-translate/useTranslation";
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
    const { locales } = i18nConfig;
    const { lang } = useTranslation();
    const changeLanguage = async (lang: string) => {
        if (!locales.includes(lang)) return;

        await setLanguage(lang);
    };

    const currentLanguage = props.languages.find((l) => l.code === lang);
    return (
        <Menu>
            {({ isOpen, onClose }) => (
                <>
                    {
                        <MenuButton
                            isActive={isOpen}
                            as={Button}
                            rightIcon={<FaAngleDown />}
                            variant="outline"
                            closeOnSelect={true}
                        >
                            <HStack>
                                {currentLanguage ? (
                                    <>
                                        <Image
                                            src={`/${currentLanguage.code}.svg`}
                                            width={22}
                                            height={12}
                                            alt={currentLanguage.label}
                                            priority
                                        />
                                        <span>
                                            {props.mediaQuery.isLg ||
                                                (props.isMobile &&
                                                    currentLanguage.label)}
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
                            <MenuItem
                                key={lang.code}
                                onClick={() => {
                                    changeLanguage(lang.code as string);
                                    onClose();
                                }}
                            >
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
