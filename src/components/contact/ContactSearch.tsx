import { InputGroup, InputLeftElement, Icon, Input } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { IoIosSearch } from "react-icons/io";

interface IContactSearch {
    onSearch: (searchTerm: string) => void;
}

export const ContactSearch = ({ onSearch }: IContactSearch) => {
    const { t } = useTranslation("contact");
    return (
        <InputGroup>
            <InputLeftElement pointerEvents="none">
                <Icon as={IoIosSearch} />
            </InputLeftElement>

            <Input
                type="search"
                variant="outline"
                placeholder={t("search.placeholder")}
                onChange={(e) => onSearch(e.target.value)}
            />
        </InputGroup>
    );
};
