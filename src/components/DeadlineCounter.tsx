import React from "react";
import { format, formatDistanceToNow, isAfter } from "date-fns";
import { enGB, sv } from "date-fns/locale";
import {
    Flex,
    HStack,
    VStack,
    Text,
    Heading,
    Spacer,
    Icon,
    Box,
} from "@chakra-ui/react";
import { getTimeLeft } from "utils/dates";
import useTranslation from "next-translate/useTranslation";
import { ComponentEventSchedule } from "types/strapi";
import { BiChevronRight } from "react-icons/bi";
interface Props {
    schedule: Omit<ComponentEventSchedule, "id" | "__typename">;
}
export const DeadlineCounter = ({ schedule, ...props }: Props) => {
    const { t, lang } = useTranslation("event");
    const deadlineDate = new Date(schedule.deadline);
    const startDate = new Date(schedule.start);
    const endDate = new Date(schedule.end);
    const day = format(deadlineDate, "dd");
    const month = format(deadlineDate, "MMMM");

    const start = {
        hour: format(startDate, "HH:mm"),
        date: format(startDate, "dd MMMM"),
    };
    const end = {
        hour: format(endDate, "HH:mm"),
        date: format(endDate, "dd MMMM"),
    };
    return (
        <HStack spacing={16}>
            <VStack
                bg="#C5B19F"
                borderRadius={7}
                p={4}
                h={36}
                w={36}
                justify="space-evenly"
            >
                <Text>Deadline</Text>
                <Heading fontFamily="source sans pro" fontSize="2rem">
                    {day}
                </Heading>
                <Heading
                    fontFamily="source sans pro"
                    fontSize="2rem"
                    fontWeight={500}
                >
                    {month}
                </Heading>
            </VStack>
            <HStack
                borderRadius={7}
                spacing={8}
                p={4}
                h={36}
                bg="#13242A"
                color="white"
                align="space-evenly"
            >
                <VStack align="start">
                    <Text>{t("deadline.from")}</Text>
                    <Spacer />
                    <Box>
                        <Text>{start.hour}</Text>
                        <Text>{start.date}</Text>
                    </Box>
                </VStack>
                <VStack>
                    <Spacer />
                    <BiChevronRight size={32} />
                </VStack>
                <VStack align="start">
                    <Text>{t("deadline.to")}</Text>
                    <Spacer />
                    <Box>
                        <Text>{end.hour}</Text>
                        <Text>{end.date}</Text>
                    </Box>
                </VStack>
            </HStack>
        </HStack>
    );
};
