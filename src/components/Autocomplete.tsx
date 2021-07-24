import React, { useRef, useState } from "react";
import {
    Box,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    InputProps,
    InputRightElement,
    List,
    ListItem,
    ListItemProps,
    ListProps,
} from "@chakra-ui/react";
import { matchSorter } from "match-sorter";

export interface Option {
    value: string;
    label: string;
}

interface Props {
    options: Option[];
    result: Option[];
    setResult: React.Dispatch<React.SetStateAction<Option[]>>;
    placeholder?: string;
    createText?: string;
    renderSelect: (option: Option) => React.ReactNode;
    inputOptions?: InputProps;
    inputLeftIcon?: React.ReactNode;
    inputRightIcon?: React.ReactNode;
    listOptions?: ListProps;
    listItemOptions?: ListItemProps;
}

export const AutoComplete = (props: Props) => {
    const [optionsCopy, setOptionsCopy] = useState<Option[]>(props.options);
    const [displayOptions, setDisplayOptions] = useState<boolean>(false);
    const [partialResult, setPartialResult] = useState<Option[]>();
    const [inputValue, setInputValue] = useState<string>();

    const inputRef = useRef<HTMLInputElement>(null);

    const selectOption = (option: Option) => {
        if (props.result.includes(option)) {
            props.setResult((oldResult) => [
                ...oldResult.filter(
                    (existingOption) => existingOption.value !== option.value
                ),
            ]);
        } else {
            props.setResult((oldResult) => {
                const r = [...oldResult, option];
                return r;
            });
        }
    };

    const selectOptionFromList = (option: Option) => {
        selectOption(option);
        setDisplayOptions(false);
        if (inputRef && inputRef.current !== null) {
            inputRef.current.value = "";
        }
    };

    const filterOptions = (inputValue: string) => {
        if (inputValue) {
            setDisplayOptions(true);
            setPartialResult(
                matchSorter(optionsCopy, inputValue, {
                    keys: ["label", "value"],
                })
            );
            setInputValue(inputValue);
            return;
        }
        setDisplayOptions(false);
    };

    const createOption = () => {
        if (inputValue) {
            const newOption: Option = {
                label: inputValue,
                value: inputValue,
            };
            setOptionsCopy([newOption, ...optionsCopy]);
            selectOption(newOption);
            setDisplayOptions(false);
            if (inputRef && inputRef.current !== null) {
                inputRef.current.value = "";
            }
        }
    };

    return (
        <Box>
            {props.result.length > 0 && (
                <Flex my={2} w="full" wrap="wrap">
                    {props.result.map((option, key) => (
                        <Box
                            mr={1}
                            mb={0.5}
                            key={key}
                            onClick={() => selectOption(option)}
                        >
                            {props.renderSelect(option)}
                        </Box>
                    ))}
                </Flex>
            )}
            <InputGroup>
                {props.inputLeftIcon && (
                    <InputLeftElement pointerEvents="none">
                        {props.inputLeftIcon}
                    </InputLeftElement>
                )}
                <Input
                    {...props.inputOptions}
                    ref={inputRef}
                    placeholder={
                        props.placeholder ? props.placeholder : "placeholder"
                    }
                    onChange={(e) => filterOptions(e.currentTarget.value)}
                />
                {props.inputRightIcon && (
                    <InputRightElement pointerEvents="none">
                        {props.inputRightIcon}
                    </InputRightElement>
                )}
            </InputGroup>

            {displayOptions && (
                <List {...props.listOptions}>
                    {partialResult?.map((option, key) => (
                        <ListItem
                            {...props.listItemOptions}
                            key={key}
                            onClick={() => selectOptionFromList(option)}
                            cursor="pointer"
                        >
                            <Flex align="center">{option.label}</Flex>
                        </ListItem>
                    ))}
                    {!partialResult?.length && (
                        <ListItem
                            {...props.listItemOptions}
                            onClick={() => createOption()}
                            cursor="pointer"
                        >
                            <Flex align="center">
                                {props.createText
                                    ? props.createText
                                    : "Create new option"}
                            </Flex>
                        </ListItem>
                    )}
                </List>
            )}
        </Box>
    );
};
