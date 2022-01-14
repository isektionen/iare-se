import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Box,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    InputProps,
    InputRightElement,
    List,
    ListIcon,
    ListItem,
    ListItemProps,
    ListProps,
    useOutsideClick,
} from "@chakra-ui/react";
import { matchSorter } from "match-sorter";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

export interface Option {
    value: string;
    label: string;
}

interface Props {
    options: Option[];
    result: Option[];
    allowMany?: boolean;
    canCreate?: boolean;
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
    const [partialResult, setPartialResult] = useState<Option[]>([]);
    const [cursor, _setCursor] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>();

    const inputRef = useRef<HTMLInputElement>(null);

    const setCursor = useCallback(
        (offset) => {
            const len = partialResult.length - 1;
            const next = cursor + offset;

            const nextCursor =
                next < 0
                    ? len
                    : next > len
                    ? 0
                    : Math.max(0, Math.min(next, len));
            _setCursor(nextCursor);
        },
        [cursor, partialResult]
    );

    const resetCursor = useCallback(() => {
        _setCursor(0);
    }, []);

    const selectOption = (option: Option) => {
        if (!props.allowMany && props.result.length > 0) {
            if (props.result.includes(option)) {
                props.setResult(
                    props.result.filter(
                        (existingOption) =>
                            existingOption.value !== option.value
                    )
                );
            } else {
                props.setResult([option]);
            }
        } else if (props.result.includes(option)) {
            props.setResult(
                props.result.filter(
                    (existingOption) => existingOption.value !== option.value
                )
            );
        } else {
            props.setResult([...props.result, option]);
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

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!partialResult) return;
        if (event.key === "Enter") {
            event.preventDefault();
            const _option = partialResult[cursor];
            if (_option === undefined) {
                createOption();
            } else {
                selectOptionFromList(_option);
            }
            resetCursor();
        }
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setCursor(1);
        }
        if (event.key === "ArrowUp") {
            event.preventDefault();
            setCursor(-1);
        }
    };

    const boxRef = useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref: boxRef,
        handler: () => {
            if (displayOptions) {
                setDisplayOptions(false);
                resetCursor();
            }
        },
    });
    return (
        <Box ref={boxRef} position="relative">
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
                    onKeyDown={onKeyDown}
                    placeholder={props.placeholder ? props.placeholder : ""}
                    onChange={(e) => filterOptions(e.currentTarget.value)}
                    onClick={() => {
                        if (inputRef?.current?.value === "") {
                            setPartialResult(optionsCopy);
                        }
                        setDisplayOptions((s) => !s);
                    }}
                />
                {props.inputRightIcon && (
                    <InputRightElement pointerEvents="none">
                        {props.inputRightIcon}
                    </InputRightElement>
                )}
            </InputGroup>

            {displayOptions && (
                <List {...props.listOptions} maxH="30vh" overflowY="scroll">
                    {partialResult?.map((option, key) => {
                        return (
                            <ListItem
                                {...props.listItemOptions}
                                key={key}
                                bg={cursor === key ? "gray.100" : undefined}
                                onClick={() => selectOptionFromList(option)}
                                cursor="pointer"
                            >
                                <Flex align="center">
                                    <ListIcon
                                        as={
                                            props.result.includes(option)
                                                ? MdCheckBox
                                                : MdCheckBoxOutlineBlank
                                        }
                                        size={20}
                                    />
                                    {option.label}
                                </Flex>
                            </ListItem>
                        );
                    })}
                    {props.canCreate && !partialResult?.length && (
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
