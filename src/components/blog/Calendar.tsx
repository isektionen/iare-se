import {
    Text,
    Box,
    Center,
    Circle,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Grid,
    GridItem,
    GridProps,
    HStack,
    IconButton,
    Spacer,
    useBreakpointValue,
    useDisclosure,
    VStack,
    Button,
} from "@chakra-ui/react";
import { WrapPadding } from "components/browser/WrapPadding";
import { LinkComponent } from "components/LinkComponent";
import { addHours } from "date-fns";
import { useDynamicLocale } from "hooks/use-format";
import useTranslation from "next-translate/useTranslation";
import React, { useState, useCallback, useMemo } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useCalendar, Appointment } from "state/calendar";
import { Feed } from "views/LandingPage";

interface IView extends GridProps {
    feed: Feed;
    span?: number;
}

export const Calendar = ({ feed }: IView) => {
    const { t } = useTranslation("feed");
    const locale = useDynamicLocale();
    const { labels, days, month, goBackward, goToday, goForward } = useCalendar(
        {
            weekStartWith: "monday",
            key: "blog",
            locale,
            appointments: feed.map((item) => ({
                label: item.title,
                href: item.__href,
                start: new Date(item.__calendarDate),
                end: addHours(new Date(item.__calendarDate), 1),
            })),
        }
    );
    const [selectedDay, setSelectedDay] = useState<number>(0);
    const isAboveMd = useBreakpointValue({ base: false, md: true });

    const { onClose, onOpen, isOpen } = useDisclosure();

    const handleOnOpen = useCallback(
        (appointments: Appointment[] | null, index: number) => {
            if (appointments && !isAboveMd) {
                setSelectedDay(index);
                onOpen();
            }
        },
        [isAboveMd, onOpen]
    );

    const selectedAppointments = useMemo(
        () => days[selectedDay].appointments,
        [days, selectedDay]
    );
    return (
        <Box px={{ base: 6, md: 12 }} w="full">
            <Flex w="full">
                <Text textTransform="capitalize" fontWeight="bold">
                    {month}
                </Text>
                <Spacer />
                <HStack>
                    <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="previous month"
                        icon={<IoChevronBack />}
                        onClick={goBackward}
                    />
                    <Button size="sm" variant="ghost" onClick={goToday}>
                        {t("calendar.today")}
                    </Button>
                    <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="next month"
                        icon={<IoChevronForward />}
                        onClick={goForward}
                    />
                </HStack>
            </Flex>
            <Grid w="full" templateColumns="repeat(7, 1fr)">
                {labels.map((label) => (
                    <GridItem key={label} fontSize="md" h={6}>
                        <Center w="full">{label}</Center>
                    </GridItem>
                ))}
            </Grid>
            <Grid
                templateColumns="repeat(7, 1fr)"
                templateRows="repeat(6, 1fr)"
                w="full"
                fontSize={{ base: "sm", md: "xs" }}
                borderBottomWidth="1px"
                borderRightWidth="1px"
                overflow="hidden"
            >
                {days.map((day) => (
                    <GridItem
                        cursor={day.appointments ? "pointer" : "auto"}
                        onClick={() =>
                            handleOnOpen(day.appointments, day.index)
                        }
                        borderLeftWidth="1px"
                        borderTopWidth="1px"
                        key={"day-" + day.index}
                        bg={day.isWeekend ? "gray.50" : "white"}
                        p={0.5}
                        h={{ base: 20, md: 32 }}
                    >
                        <Flex
                            direction={{ base: "column-reverse", md: "row" }}
                            align={{ base: "center", md: "flex-start" }}
                            w="full"
                        >
                            {isAboveMd && day.appointments && (
                                <VStack align="stretch" w="full">
                                    {day.appointments
                                        .slice(0, 4)
                                        .map((appointment, i) => (
                                            <LinkComponent
                                                href={appointment.href}
                                                size="xs"
                                                variant="iareSolid"
                                                justifyContent="flex-start"
                                                w="full"
                                                as={Button}
                                                key={
                                                    "day-" + day.index + "-" + i
                                                }
                                            >
                                                {appointment.label.slice(
                                                    0,
                                                    Math.min(
                                                        appointment.label
                                                            .length,
                                                        15
                                                    )
                                                )}
                                            </LinkComponent>
                                        ))}
                                </VStack>
                            )}
                            {!isAboveMd && day.appointments && (
                                <HStack
                                    w="full"
                                    spacing="-1.5"
                                    align="center"
                                    justify="center"
                                    fontSize="sm"
                                    px={2}
                                    pt={2}
                                >
                                    {day.appointments
                                        .slice(0, 2)
                                        .map((appointment, i) => {
                                            const displayRest =
                                                (day?.appointments?.length ??
                                                    0) > 2 && i === 1;
                                            const rest = Math.max(
                                                (day?.appointments?.length ??
                                                    0) - 2,
                                                0
                                            );
                                            return (
                                                <Circle
                                                    key={
                                                        "day-" +
                                                        day.index +
                                                        "-" +
                                                        i
                                                    }
                                                    size={4}
                                                    color="white"
                                                    bg="gray.900"
                                                    fontSize="xs"
                                                    borderColor="white"
                                                    borderWidth="0.5px"
                                                    zIndex={i + 1}
                                                >
                                                    {displayRest && `+${rest}`}
                                                </Circle>
                                            );
                                        })}
                                </HStack>
                            )}

                            <Spacer />

                            <Box p={1}>
                                <Circle
                                    size={{ base: 6, md: 5 }}
                                    color={
                                        day.isToday
                                            ? "white"
                                            : day.isSameMonth
                                            ? "black"
                                            : "gray.500"
                                    }
                                    bg={day.isToday ? "brand.200" : undefined}
                                >
                                    {day.label}
                                </Circle>
                            </Box>
                        </Flex>
                    </GridItem>
                ))}
            </Grid>
            <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody>
                        <WrapPadding>
                            <VStack align="flex-start">
                                {selectedAppointments?.map((appointment, i) => (
                                    <LinkComponent
                                        href={appointment.href}
                                        size="sm"
                                        variant="ghost"
                                        justifyContent="flex-start"
                                        w="full"
                                        as={Button}
                                        key={"day-" + selectedDay + "-" + i}
                                    >
                                        {appointment.label.slice(
                                            0,
                                            Math.min(
                                                appointment.label.length,
                                                30
                                            )
                                        )}
                                    </LinkComponent>
                                ))}
                            </VStack>
                        </WrapPadding>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};
