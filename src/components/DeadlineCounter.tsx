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
    Stack,
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
    const deadlineDate =
        schedule && schedule.deadline ? new Date(schedule.deadline) : null;
    const startDate =
        schedule && schedule.start ? new Date(schedule.start) : null;
    const endDate = schedule && schedule.end ? new Date(schedule.end) : null;
    const day = deadlineDate ? format(deadlineDate, "dd") : "N/A";
    const month = deadlineDate ? format(deadlineDate, "MMMM") : null;

    const start = startDate
        ? {
              hour: format(startDate, "HH:mm"),
              date: format(startDate, "dd MMMM"),
          }
        : null;
    const end = endDate
        ? {
              hour: format(endDate, "HH:mm"),
              date: format(endDate, "dd MMMM"),
          }
        : null;
    return (
        <Stack
            spacing={{ base: 8, md: 16 }}
            w="full"
            direction={{ base: "column", md: "row" }}
        >
            <VStack
                bg="#C5B19F"
                borderRadius={7}
                align={{ base: "start", md: "center" }}
                p={4}
                h={36}
                w={{ base: "full", md: 36 }}
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
                    {month && month}
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
                {start && (
                    <VStack align="start">
                        <Text>{t("deadline.from")}</Text>
                        <Spacer />
                        <Box>
                            <Text>{start.hour}</Text>
                            <Text>{start.date}</Text>
                        </Box>
                    </VStack>
                )}
                {end && (
                    <React.Fragment>
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
                    </React.Fragment>
                )}
            </HStack>
        </Stack>
    );
};
