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
    Spacer,
    Tag,
    Text,
} from "@chakra-ui/react";
import { Datepicker, getDateLabel } from "components/datepicker/Datepicker";
import {
    isBefore,
    isEqual,
    isWithinInterval,
    isAfter,
    isSameDay,
    addDays,
    subDays,
} from "date-fns";
import useTranslation from "next-translate/useTranslation";
import React, { useRef, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { useDatepickerState } from "state/datepicker";
import { Action, useFilter } from "state/document";
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
}

const FilterType = ({ type, option, onClose }: IFilterType) => {
    const { dispatch, state } = useFilter();

    const { startDate, endDate, reset } = useDatepickerState();
    const options = {
        string: [
            {
                label: "Contains",
                method: (value: string, inputValue: string) =>
                    value.toLowerCase().includes(inputValue.toLowerCase()),
            },
            {
                label: "Starts with",
                method: (value: string, inputValue: string) =>
                    value.toLowerCase().startsWith(inputValue.toLowerCase()),
            },
        ],
        datetime: [
            {
                label: "Is Between",
                method: (
                    value: Date,
                    startDate: Date,
                    endDate: Date
                ): boolean =>
                    isWithinInterval(value, {
                        start: subDays(startDate, 1),
                        end: addDays(endDate, 1),
                    }),
            },
            {
                label: "Is Exact",
                method: (value: Date, startDate: Date, _unused: any): boolean =>
                    isSameDay(value, startDate),
            },
            {
                label: "Is Before",
                method: (value: Date, startDate: Date, _unused: any): boolean =>
                    isBefore(value, startDate),
            },
            {
                label: "Is After",
                method: (value: Date, startDate: Date, _unused: any): boolean =>
                    isAfter(value, startDate),
            },
        ],
        boolean: [
            { label: "Is", method: (value: boolean) => value },
            { label: "Is not", method: (value: boolean) => !value },
        ],
    };

    const [selected, setSelected] = useState(_.first(options[type]));

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFilter = () => {
        const toPath = (path: string) => {
            if (path.includes(".")) {
                return path.split(".");
            }
            return path;
        };

        switch (type) {
            case "boolean":
                dispatch({
                    type: "add",
                    id: `${type}-${option.value}`,
                    title: `is ${option.label}`,
                    contentType: type,

                    boundary: (item) => {
                        /* @ts-ignore */
                        const res = selected.method(item[option.value]);
                        return res;
                    },
                });
                break;
            case "string":
                const inputValue = inputRef.current?.value || "NA";
                dispatch({
                    type: "add",
                    id: `${type}-${option.value}`,
                    title: `${
                        option.label
                    } ${selected?.label.toLowerCase()} ${inputValue}`,
                    contentType: type,

                    boundary: (item) => {
                        /* @ts-ignore */
                        return selected.method(
                            /* @ts-ignore */
                            _.get(item, toPath(option.value as string)),
                            inputValue
                        );
                    },
                });
                break;
            case "datetime":
                const date = getDateLabel(startDate, endDate);
                dispatch({
                    type: "add",
                    id: `${type}-${option.value}`,
                    title: `${
                        option.label
                    } ${selected?.label.toLowerCase()} ${date}`,
                    contentType: type,

                    boundary: (item) => {
                        const _date = new Date(item[option.value as "date"]);
                        /* @ts-ignore */
                        const res = selected.method(_date, startDate, endDate);
                        return res;
                    },
                });
                reset();
                break;
        }
    };

    if (state.some((item) => item.id === `${type}-${option.value}`)) {
        return <></>;
    }
    return (
        <Box w="full">
            <HStack spacing={2}>
                {type === "boolean" && (
                    <>
                        <FilterMenu
                            options={options[type]}
                            selected={selected}
                            setSelected={setSelected as any}
                        />
                        <Tag size="lg" fontWeight="bold">
                            {option.label}
                        </Tag>
                    </>
                )}
                {type === "string" && (
                    <>
                        <Tag size="lg" fontWeight="bold" isTruncated>
                            {option.label}
                        </Tag>
                        <FilterMenu
                            options={options[type]}
                            selected={selected}
                            setSelected={setSelected as any}
                        />
                        <Input w={32} ref={inputRef} size="sm" rounded="lg" />
                    </>
                )}
                {type === "datetime" && (
                    <>
                        <Tag size="lg" fontWeight="bold" isTruncated>
                            {option.label}
                        </Tag>
                        <FilterMenu
                            options={options[type]}
                            selected={selected}
                            setSelected={setSelected as any}
                        />
                        <Datepicker
                            isInterval={
                                selected && selected.label === "Is Between"
                            }
                        />
                    </>
                )}
                <Spacer />
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
        string: [
            { label: "Name", value: "name" },
            { label: "Business year", value: "businessYear" },
            { label: "Category", value: "category.name" },
        ],
        datetime: [
            {
                label: "Date",
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
                        <PopoverContent w="450px">
                            <PopoverBody>
                                <VStack align="flex-start">
                                    {types.boolean.map((option) => (
                                        <FilterType
                                            type={"boolean"}
                                            key={`boolean-${option.value}-button`}
                                            option={option}
                                            onClose={onClose}
                                        />
                                    ))}

                                    {types.string.map((option) => (
                                        <FilterType
                                            type={"string"}
                                            key={`string-${option.value}-button`}
                                            option={option}
                                            onClose={onClose}
                                        />
                                    ))}
                                    {types.datetime.map((option) => (
                                        <FilterType
                                            type={"datetime"}
                                            key={`datetime-${option.value}-button`}
                                            option={option}
                                            onClose={onClose}
                                        />
                                    ))}
                                </VStack>
                            </PopoverBody>
                        </PopoverContent>
                    </>
                )}
            </Popover>
        </Wrap>
    );
};
