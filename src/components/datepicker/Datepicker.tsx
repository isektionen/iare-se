import { Button, IconButton, IconButtonProps } from "@chakra-ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Text,
    Flex,
    Spacer,
    CloseButton,
    SimpleGrid,
    Box,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useMemo } from "react";
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
                {month?.days.map((day) => (
                    <Day key={"day-" + day} date={day.date} />
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
    const { startDate, endDate, goToNextMonths, goToPreviousMonths } =
        useDatepicker({ isInterval });
    const month = useMonth();

    const date = useMemo(() => {
        const _date = getDateLabel(startDate, endDate);
        return _date || "Date";
    }, [endDate, startDate]);
    return (
        <Popover>
            {({ onClose }) => (
                <>
                    <PopoverTrigger>
                        <Button size="sm" rightIcon={<IoIosArrowDown />}>
                            {date}
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
                        </PopoverHeader>
                        <PopoverBody>
                            <Month />
                        </PopoverBody>
                    </PopoverContent>
                </>
            )}
        </Popover>
    );
};
