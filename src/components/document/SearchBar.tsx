import {
    InputGroup,
    InputRightAddon,
    Input,
    Box,
    VStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    CheckboxGroup,
    Checkbox,
    HStack,
    Wrap,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
    ButtonProps,
} from "@chakra-ui/react";
import { StringOrNumber } from "@chakra-ui/utils";
import { WrapPadding } from "components/browser/WrapPadding";
import { Datepicker } from "components/datepicker/Datepicker";
import useTranslation from "next-translate/useTranslation";
import React, { useCallback, useMemo } from "react";
import { isMobile } from "react-device-detect";
import { IoIosArrowDown } from "react-icons/io";
import { useFuseRegister, QueryState } from "state/document";

export interface SelectOption {
    label: string;
    value: string;
    isSelected: boolean;
}

interface ISelect extends ButtonProps {
    label: string;
    options: SelectOption[];
    setOptions: (options: SelectOption[]) => void;
}

export const SelectMenu = ({
    label,
    options,
    setOptions,
    ...buttonProps
}: ISelect) => {
    const { t } = useTranslation("searchbar");

    const selected = useMemo(() => {
        const _options = options.filter((option) => option.isSelected);
        if (_options.length > 0) {
            const _label = _options.map((item) => item.label).join(", ");
            if (_label.length > 25) {
                return t("label", {
                    count: _options.length,
                    item: t(`menu.${label}.label`, { count: _options.length }),
                });
            }
            return _label;
        }
        return t(`menu.${label}.label`);
    }, [label, options, t]);

    const handleChange = useCallback(
        (value: StringOrNumber[]) => {
            setOptions(
                options.map((item) => ({
                    ...item,
                    isSelected: value.includes(item.value),
                }))
            );
        },
        [options, setOptions]
    );

    const { isOpen, onClose, onOpen } = useDisclosure();

    if (isMobile) {
        return (
            <>
                <Button
                    size="sm"
                    variant="outline"
                    rightIcon={<IoIosArrowDown />}
                    onClick={onOpen}
                    {...buttonProps}
                >
                    {selected}
                </Button>
                <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>{label}</DrawerHeader>

                        <DrawerBody pb={12}>
                            <WrapPadding>
                                <CheckboxGroup onChange={handleChange}>
                                    <VStack spacing={2} align="stretch" p={2}>
                                        {options.map((option) => (
                                            <Checkbox
                                                value={option.value}
                                                key={option.label}
                                            >
                                                {option.label}
                                            </Checkbox>
                                        ))}
                                    </VStack>
                                </CheckboxGroup>
                            </WrapPadding>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        );
    }

    return (
        <Menu
            autoSelect={false}
            onOpen={onOpen}
            onClose={onClose}
            isOpen={isOpen}
        >
            <MenuButton
                as={Button}
                rightIcon={<IoIosArrowDown />}
                size="sm"
                variant="outline"
                {...buttonProps}
            >
                {selected}
            </MenuButton>
            <MenuList>
                <CheckboxGroup onChange={handleChange}>
                    <VStack spacing={2} align="stretch" p={2}>
                        {options.map((option) => (
                            <Checkbox value={option.value} key={option.label}>
                                {option.label}
                            </Checkbox>
                        ))}
                    </VStack>
                </CheckboxGroup>
            </MenuList>
        </Menu>
    );
};

export const SearchBar = () => {
    const { t } = useTranslation("searchbar");

    const { register, useSelection } = useFuseRegister();
    const {
        options: { category, businessYear },
        setOptions,
    } = useSelection();
    return (
        <VStack pb={16} align="flex-start">
            <InputGroup>
                <Input
                    placeholder={t("searchbar.label")}
                    variant="outline"
                    {...register}
                />
            </InputGroup>
            <Wrap spacing={2} shouldWrapChildren>
                <Datepicker />

                {category && (
                    <SelectMenu
                        label={"category"}
                        options={category}
                        setOptions={setOptions("category")}
                    />
                )}
                {businessYear && (
                    <SelectMenu
                        label={"businessYear"}
                        options={businessYear}
                        setOptions={setOptions("businessYear")}
                    />
                )}
            </Wrap>
        </VStack>
    );
};
