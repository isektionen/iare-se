import {
    Box,
    Flex,
    HStack,
    List,
    ListItem,
    VStack,
    Wrap,
} from "@chakra-ui/layout";
import {
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Tag,
    Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, {
    useCallback,
    useMemo,
    useReducer,
    useRef,
    useState,
} from "react";
import { IconContext, IconType } from "react-icons";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { Action, useFilter } from "state/document";
import { ComponentDocumentDocuments } from "types/strapi";
import _ from "underscore";

type Option = { label: string; value?: string };

interface IFilterMenu {
    options: Option[];
    selected: Option | undefined;
    setSelected: (item: Option) => void;
}

const FilterMenu = ({ options, selected, setSelected }: IFilterMenu) => {
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<IoIosArrowDown />} size="sm">
                {selected?.label}
            </MenuButton>
            <MenuList>
                {options.map((option) => (
                    <MenuItem
                        key={option.label}
                        onClick={() => setSelected(option)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

interface IFilterType {
    type: "boolean" | "datetime" | "string";
    option: Option;
    onClose: () => void;
    dispatch: (action: Action) => void;
}

const FilterType = ({ type, option, onClose, dispatch }: IFilterType) => {
    const options = {
        string: [
            { label: "Contains", value: "contains" },
            { label: "Starts with", value: "startsWith" },
        ],
        datetime: [
            { label: "Is Between" },
            { label: "Is" },
            { label: "Is Before" },
        ],
        boolean: [
            { label: "Is", method: (value: boolean) => value },
            { label: "Is not", method: (value: boolean) => !value },
        ],
    };

    const [selected, setSelected] = useState(_.first(options[type]));

    const handleFilter = () => {
        switch (type) {
            case "boolean":
                dispatch({
                    type: "add",
                    id: `boolean-${option.value}`,
                    title: `is ${option.label}`,
                    contentType: type,

                    boundary: (item) => {
                        /* @ts-ignore */
                        const res = selected.method(item[option.value]);
                        return res;
                    },
                });
        }
    };

    return (
        <Box>
            <HStack spacing={2}>
                <FilterMenu
                    options={options[type]}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Tag size="lg" fontWeight="bold">
                    {option.label}
                </Tag>
                <Button
                    variant="iareSolid"
                    size="sm"
                    onClick={() => {
                        onClose();
                        handleFilter();
                    }}
                >
                    Apply
                </Button>
            </HStack>
        </Box>
    );
};

export const FilterOptions = () => {
    const { t } = useTranslation("filter");

    const types = {
        string: ["name", "businessYear", "category.name"],
        datetime: [
            {
                value: "date",
            },
        ],
        boolean: [
            { label: "Archived", value: "archived" },
            { label: "In use", value: "current" },
        ],
    };

    const { dispatch, state } = useFilter();

    return (
        <Wrap shouldWrapChildren spacing={2} mb={6}>
            {state.map((f) => (
                <Button key={f.id} onClick={f.onRemove}>
                    {f.title}
                </Button>
            ))}
            <Popover placement="bottom-end">
                {({ onClose }) => (
                    <>
                        <PopoverTrigger>
                            <Button leftIcon={<HiOutlinePlus />}>
                                {t("add")}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverBody>
                                <VStack align="flex-start">
                                    {types.boolean.map((option) => (
                                        <FilterType
                                            type={"boolean"}
                                            key={`boolean-${option.value}-button`}
                                            option={option}
                                            onClose={onClose}
                                            dispatch={dispatch}
                                        />
                                    ))}

                                    <Flex></Flex>
                                </VStack>
                            </PopoverBody>
                        </PopoverContent>
                    </>
                )}
            </Popover>
        </Wrap>
    );
};
