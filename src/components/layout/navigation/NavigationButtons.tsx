import { HStack, IconButton, Button } from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdChatBubble } from "react-icons/md";
import { LanguageItem } from "types/header";
import {
    ComponentHeaderContact,
    ComponentHeaderLanguages,
    Maybe,
} from "types/strapi";
import { LanguageMenu } from "./LanguageMenu";
import { useRouter } from "next/router";

interface Props {
    languages: ComponentHeaderLanguages[];
    contact: ComponentHeaderContact;
    mediaQuery: {
        isLg?: boolean;
        isMd?: boolean;
    };
}

export const NavigationButtons = (props: Props) => {
    const standardLanguage = props.languages[0];
    const router = useRouter();
    return (
        <HStack>
            {/*<IconButton
                aria-label="Search articles"
                icon={<FaSearch />}
                variant="outline"
            />*/}
            <LanguageMenu
                standardLanguage={standardLanguage}
                languages={props.languages}
                mediaQuery={props.mediaQuery}
            />

            <Button
                leftIcon={<MdChatBubble />}
                isDisabled={true}
                onClick={() => router.push(props.contact.href)}
            >
                {props.mediaQuery.isLg && props.contact.label}
            </Button>
        </HStack>
    );
};
