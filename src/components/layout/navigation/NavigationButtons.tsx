import { HStack, IconButton, Button } from "@chakra-ui/react";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdChatBubble } from "react-icons/md";
import { LanguageItem } from "types/header";
import { LanguageMenu } from "./LanguageMenu";

interface Props {
    languages: LanguageItem[];
    contact: string;
    mediaQuery: {
        isLg?: boolean;
        isMd?: boolean;
    };
}

export const NavigationButtons = (props: Props) => {
    const standardLanguage = props.languages[0];
    return (
        <HStack>
            <IconButton
                aria-label="Search articles"
                icon={<FaSearch />}
                variant="outline"
            />
            <LanguageMenu
                standardLanguage={standardLanguage}
                languages={props.languages}
                mediaQuery={props.mediaQuery}
            />

            <Button leftIcon={<MdChatBubble />}>
                {props.mediaQuery.isLg && props.contact}
            </Button>
        </HStack>
    );
};
