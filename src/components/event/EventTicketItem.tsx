import { Box, Radio, useRadio, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { ChangeEvent } from "react";

interface Props {
    value: string;
    name: string;
    isChecked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    "data-radiogroup": boolean;
    ticket: {
        id: number;
        swedishName: string;
        englishName: string;
        ticketUID: string;
        price: number;
        currency: string;
    };
}

export const EventTicketItem = (props: Props) => {
    const { value, name, isChecked, onChange } = props;
    const { getInputProps, getCheckboxProps } = useRadio({
        value,
        name,
        isChecked,
        onChange,
        "data-radiogroup": props["data-radiogroup"],
    });
    const input = getInputProps();
    const checkbox = getCheckboxProps();

    const { lang } = useTranslation();
    const itemName =
        lang !== "en" ? props.ticket.swedishName : props.ticket.englishName;
    return (
        <Box as="label" w="full">
            <input {...input} />
            <Box
                {...checkbox}
                px={8}
                py={4}
                w="full"
                cursor="pointer"
                borderRadius="md"
                borderWidth="1px"
                borderColor="white"
                display="flex"
                justifyContent="space-between"
                bg="white"
                _checked={{
                    bg: "gray.100",
                    borderColor: "gray.500",
                }}
                _focus={{
                    borderColor: "black",
                }}
                _hover={{
                    borderColor: "black",
                }}
            >
                <Radio
                    name={props.name}
                    value={props.value}
                    isChecked={isChecked}
                    onChange={onChange}
                    colorScheme="brand"
                >
                    {itemName}
                </Radio>
                <Text>
                    {props.ticket.price} {props.ticket.currency}
                </Text>
            </Box>
        </Box>
    );
};
