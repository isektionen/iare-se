import {
    Center,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AutoComplete, Option } from "components/Autocomplete";

interface Props {
    name: string;
    description: string;
    options: Option[];
    result: Option[];
    setResult: React.Dispatch<React.SetStateAction<Option[]>>;
    placeholder: string;
    createText: string;
}

export const OptionsInput = (props: Props) => {
    return (
        <Flex direction="row">
            <Flex direction="column" w="25%">
                <Text
                    as="h6"
                    fontSize={18}
                    textTransform="capitalize"
                    fontWeight={"bold"}
                >
                    {props.name}
                </Text>
                <Text>{props.description}</Text>
            </Flex>
            <Flex direction="column" w="85%" pl={6}>
                <AutoComplete
                    options={props.options}
                    result={props.result}
                    setResult={props.setResult}
                    placeholder={props.placeholder}
                    renderSelect={(option: Option) => (
                        <Tag
                            borderRadius="full"
                            variant="solid"
                            colorScheme="blackAlpha"
                        >
                            <TagLabel>{option.label}</TagLabel>
                            <TagCloseButton />
                        </Tag>
                    )}
                    createText={props.createText}
                    inputLeftIcon={<FaSearch />}
                    inputOptions={{
                        variant: "filled",
                        bg: "gray.50",
                        _hover: {
                            bg: "gray.200",
                        },
                        _active: {
                            bg: "gray.300",
                        },
                        _focus: {
                            bg: "gray.100",
                            borderColor: "blue.300",
                        },
                    }}
                    listOptions={{
                        mt: 1,
                        spacing: 1,
                        bg: "white",
                        borderRadius: "md",
                        borderColor: "gray.300",
                        borderWidth: "1px",
                        overflow: "hidden",
                    }}
                    listItemOptions={{
                        p: 2,
                        _hover: {
                            bg: "gray.200",
                        },
                    }}
                />
            </Flex>
        </Flex>
    );
};
