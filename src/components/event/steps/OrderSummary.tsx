import {
    Box,
    BoxProps,
    Center,
    chakra,
    Divider,
    Flex,
    Heading,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Stack,
    Tag,
    TagCloseButton,
    TagLabel,
    useMenuButton,
    VStack,
    Wrap,
} from "@chakra-ui/react";
import { Option } from "components/Autocomplete";
import useTranslation from "next-translate/useTranslation";
import React, { useCallback, useMemo } from "react";
import { BiChevronDown } from "react-icons/bi";
import { HiOutlineTicket } from "react-icons/hi";
import { ComponentEventInternalTicket } from "types/strapi";

interface Props extends BoxProps {
    label: string;
    orderLabel: string;
    dietLabel: string;
    currentTicket: string;
    allTickets: ComponentEventInternalTicket[];
    diets: Option[];
    allergens: Option[];
    setTicket: any;
}

export const OrderSummary = ({
    label,
    orderLabel,
    dietLabel,
    currentTicket,
    allTickets,
    setTicket,
    diets,
    allergens,
    ...rest
}: Props) => {
    const { t, lang } = useTranslation("event");

    const ticket = allTickets.find((t) => t.ticketUID === currentTicket) || {
        id: -1,
        ticketUID: "NaN",
        swedishName: "NaN",
        englishName: "NaN",
        price: 0,
    };

    const ticketName = useCallback(
        (t) => (lang !== "en" ? t.swedishName : t.englishName),
        [lang]
    );

    const handleChange = (ticket: ComponentEventInternalTicket) => {
        setTicket(ticket.ticketUID);
    };

    return (
        <Box key="step-four" h="full" {...rest}>
            <Heading size="lg" fontWeight="700">
                {label}
            </Heading>
            <Divider mt={4} mb={8} />
            <Stack
                direction={{ base: "column", xl: "row" }}
                spacing={4}
                align="stretch"
            >
                <Box>
                    <Heading size="md" fontWeight="700" mb={6}>
                        {orderLabel}
                    </Heading>
                    <Flex
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        w={{ base: "xs", sm: "sm" }}
                        mx="auto"
                    >
                        <Center
                            h={{ base: 40, lg: 64 }}
                            w="full"
                            rounded="md"
                            bg="gray.900"
                        >
                            <Icon
                                as={HiOutlineTicket}
                                boxSize={{ base: 24, lg: 44 }}
                                color="white"
                            />
                        </Center>
                        <Box
                            w={{ base: 56, md: 64 }}
                            bg="white"
                            mt={-10}
                            shadow="lg"
                            rounded="lg"
                            overflow="hidden"
                        >
                            <Heading
                                size="md"
                                fontWeight="bold"
                                letterSpacing={1}
                                textTransform="uppercase"
                                textAlign="center"
                                py={2}
                            >
                                {ticketName(ticket)}
                            </Heading>
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                py={2}
                                px={3}
                                bg="gray.200"
                            >
                                <chakra.span fontWeight="bold" color="gray.800">
                                    {ticket.price} kr
                                </chakra.span>
                                <Menu>
                                    <MenuButton
                                        px={2}
                                        py={1}
                                        transition="all 0.2s"
                                        rounded="lg"
                                        textTransform="uppercase"
                                        bg="gray.800"
                                        fontSize="xs"
                                        fontWeight="bold"
                                        color="white"
                                        type="button"
                                        _hover={{
                                            bg: "gray.700",
                                        }}
                                        _focus={{
                                            bg: "gray.700",
                                            outline: "none",
                                        }}
                                    >
                                        {t("summary.changeMenu.label")}
                                        <Icon as={BiChevronDown} />
                                    </MenuButton>
                                    <MenuList>
                                        {allTickets.map((t) => (
                                            <MenuItem
                                                key={t.ticketUID}
                                                onClick={() => handleChange(t)}
                                            >
                                                {ticketName(t)}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Spacer />

                <Box pr={8} flex={1}>
                    <Heading size="md" fontWeight="700" mb={6}>
                        {dietLabel}
                    </Heading>
                    <Flex
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        mx="auto"
                    >
                        <Flex w="full" align="center">
                            <Heading size="xs" mr={4}>
                                {t("summary.diet.diets")}
                            </Heading>
                            <Spacer />
                            <Wrap direction="row" spacing={2} align="flex-end">
                                {diets.length > 0 &&
                                    diets.map((option) => (
                                        <Tag
                                            key={option.value}
                                            rounded="full"
                                            variant="solid"
                                            colorScheme="blackAlpha"
                                        >
                                            <TagLabel>{option.label}</TagLabel>
                                        </Tag>
                                    ))}
                                {diets.length === 0 && (
                                    <Tag
                                        rounded="full"
                                        variant="solid"
                                        colorScheme="blackAlpha"
                                    >
                                        <TagLabel>
                                            {t("summary.diet.empty")}
                                        </TagLabel>
                                    </Tag>
                                )}
                            </Wrap>
                        </Flex>
                        <Divider my={8} />
                        <Flex w="full" align="center">
                            <Heading size="xs" mr={4}>
                                {t("summary.diet.allergens")}
                            </Heading>
                            <Spacer />
                            <Wrap direction="row" spacing={2} align="flex-end">
                                {allergens.length > 0 &&
                                    allergens.map((option) => (
                                        <Tag
                                            key={option.value}
                                            rounded="full"
                                            variant="solid"
                                            colorScheme="blackAlpha"
                                        >
                                            <TagLabel>{option.label}</TagLabel>
                                        </Tag>
                                    ))}
                                {allergens.length === 0 && (
                                    <Tag
                                        rounded="full"
                                        variant="solid"
                                        colorScheme="blackAlpha"
                                    >
                                        <TagLabel>
                                            {t("summary.diet.empty")}
                                        </TagLabel>
                                    </Tag>
                                )}
                            </Wrap>
                        </Flex>
                    </Flex>
                </Box>
            </Stack>
        </Box>
    );
};
