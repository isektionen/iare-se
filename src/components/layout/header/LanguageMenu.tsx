import {
    Menu,
    MenuButton,
    HStack,
    MenuList,
    MenuItem,
    Button,
    ButtonProps,
    useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { ComponentHeaderLanguages } from "types/strapi";
import setLanguage from "next-translate/setLanguage";
import i18nConfig from "../../../../i18n";
import useTranslation from "next-translate/useTranslation";
import { IoIosArrowDown } from "react-icons/io";
interface Props extends ButtonProps {
    standardLanguage: ComponentHeaderLanguages | undefined;
    isMobile?: boolean;
    languages: ComponentHeaderLanguages[];
}

export const LanguageMenu = (props: Props) => {
    const { standardLanguage, isMobile, languages, ...rest } = props;
    const { locales } = i18nConfig;
    const { lang } = useTranslation();
    const changeLanguage = async (lang: string) => {
        if (!locales.includes(lang)) return;

        await setLanguage(lang);
    };

    const currentLanguage = languages.find((l) => l.code === lang);

    const variants = useBreakpointValue({
        base: isMobile ? currentLanguage?.label : "",
        lg: currentLanguage?.label,
    });
    return (
        <Menu closeOnSelect={true}>
            {({ isOpen, onClose }) => (
                <>
                    {
                        <MenuButton
                            isActive={isOpen}
                            as={Button}
                            rightIcon={<IoIosArrowDown />}
                            variant="outline"
                            {...rest}
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
                                        <span>{variants}</span>
                                    </>
                                ) : (
                                    <span>-</span>
                                )}
                            </HStack>
                        </MenuButton>
                    }
                    <MenuList>
                        {languages.map((lang) => (
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
