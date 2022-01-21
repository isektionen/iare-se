import {
    Button,
    IconButton,
    IconButtonProps,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverBody,
    Text,
    Flex,
    Spacer,
    SimpleGrid,
    useDisclosure,
    HStack,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Tag,
} from "@chakra-ui/react";
import { WrapPadding } from "components/browser/WrapPadding";
import { format } from "date-fns";
import { useDynamicLocale } from "hooks/use-format";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import { isMobile } from "react-device-detect";
import { IoIosArrowDown } from "react-icons/io";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";
import { useDatepicker, useDay, useMonth } from "state/datepicker";
import _ from "underscore";

interface NavProps extends IconButtonProps {}

export const NavButton = (props: Omit<NavProps, "aria-label">) => {
    return (
        <IconButton
            isRound
            size="xs"
            variant="ghost"
            aria-label="date navigation button"
            {...props}
        />
    );
};

interface DayProps {
    date: Date;
}

export const Day = ({ date }: DayProps) => {
    const { day, register } = useDay(date);
    return (
        <Button size="xs" {...register}>
            {day}
        </Button>
    );
};

export const Month = () => {
    const month = useMonth();
    return (
        <>
            <SimpleGrid columns={7} justifyContent="center">
                {month?.weekdayLabels.map((label) => (
                    <Text
                        textAlign="center"
                        key={"label" + label}
                        fontSize={10}
                    >
                        {label}
                    </Text>
                ))}
            </SimpleGrid>
            <SimpleGrid
                columns={7}
                justifyContent="center"
                rounded="md"
                overflow="hidden"
            >
                {month?.days.map((day, i) => (
                    <Day key={i + "day-" + day.day} date={day.date} />
                ))}
            </SimpleGrid>
        </>
    );
};

interface DatepickerProps {
    isInterval?: boolean;
}

export const getDateLabel = (startDate: Date | null, endDate: Date | null) => {
    const _format = "dd MMM yy";
    if (startDate && !endDate) {
        return format(startDate, _format);
    }
    if (startDate && endDate) {
        return format(startDate, _format) + " - " + format(endDate, _format);
    }
};

export const Datepicker = ({ isInterval = true }: DatepickerProps) => {
    const { t, lang } = useTranslation("datepicker");

    const locale = useDynamicLocale();

    const { reset, startDate, endDate, goToNextMonths, goToPreviousMonths } =
        useDatepicker({ isInterval, locale });
    const month = useMonth();

    const label = t("label");

    const date = useMemo(() => {
        const _date = getDateLabel(startDate, endDate);
        return _date || label;
    }, [endDate, label, startDate]);

    const { isOpen, onClose, onOpen } = useDisclosure();

    if (isMobile) {
        return (
            <>
                <Button
                    size="sm"
                    variant="outline"
                    rightIcon={<IoIosArrowDown />}
                    onClick={onOpen}
                >
                    <HStack spacing={4}>
                        <Text>{date}</Text>
                        {date !== label && (
                            <Tag
                                colorScheme="brand"
                                fontWeight="bold"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    reset();
                                }}
                            >
                                {t("reset")}
                            </Tag>
                        )}
                    </HStack>
                </Button>
                <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>
                            <Flex>
                                <Text textTransform="capitalize">
                                    {month && month.monthLabel}
                                </Text>
                                <Spacer />
                                <NavButton
                                    icon={<IoChevronBack />}
                                    onClick={goToPreviousMonths}
                                />
                                <NavButton
                                    icon={
                                        <IoChevronForward
                                            onClick={goToNextMonths}
                                        />
                                    }
                                />
                                <IconButton
                                    ml={2}
                                    isRound
                                    variant="ghost"
                                    aria-label="close"
                                    icon={<IoClose />}
                                    size="xs"
                                    onClick={onClose}
                                />
                            </Flex>
                        </DrawerHeader>
                        <DrawerBody pb={12}>
                            <WrapPadding>
                                <Month />
                            </WrapPadding>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        );
    }

    return (
        <Popover
            closeOnEsc
            closeOnBlur
            returnFocusOnClose={false}
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
        >
            <PopoverTrigger>
                <Button
                    size="sm"
                    variant="outline"
                    rightIcon={<IoIosArrowDown />}
                >
                    <HStack spacing={4}>
                        <Text>{date}</Text>
                        {date !== label && (
                            <Tag
                                colorScheme="brand"
                                fontWeight="bold"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    reset();
                                }}
                            >
                                {t("reset")}
                            </Tag>
                        )}
                    </HStack>
                </Button>
            </PopoverTrigger>

            <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>
                    <Flex>
                        <Text>{month && month.monthLabel}</Text>
                        <Spacer />
                        <NavButton
                            icon={<IoChevronBack />}
                            onClick={goToPreviousMonths}
                        />
                        <NavButton
                            icon={<IoChevronForward onClick={goToNextMonths} />}
                        />
                        <IconButton
                            ml={2}
                            isRound
                            variant="ghost"
                            aria-label="close"
                            icon={<IoClose />}
                            size="xs"
                            onClick={onClose}
                        />
                    </Flex>
                </PopoverHeader>
                <PopoverBody>
                    <Month />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
