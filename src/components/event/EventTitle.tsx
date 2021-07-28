import { Flex, Badge, HStack, Icon, Text } from "@chakra-ui/react";
import Box from "components/motion/Box";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { ComponentEventPlace, Maybe } from "types/strapi";
import { getDate } from "utils/dates";

interface Props {
    title: string;
    startTime: string;
    place: Maybe<ComponentEventPlace> | undefined;
    badge: {
        color: string;
        text: string;
    };
}

export const EventTitle = (props: Props) => {
    const { lang } = useTranslation();

    return (
        <Flex justify="space-between" align="center" w="full">
            <Box>
                <Badge colorScheme={props.badge.color}>
                    {props.badge.text}
                </Badge>
                <Text
                    as="h6"
                    fontSize={24}
                    textTransform="capitalize"
                    fontWeight={500}
                >
                    {props.title}
                </Text>
            </Box>
            <Box>
                {props.place && (
                    <HStack>
                        <Icon as={FaMapMarkerAlt} />
                        <Text>{props.place.name}</Text>
                    </HStack>
                )}
                {props.startTime && (
                    <HStack>
                        <Icon as={MdDateRange} />
                        <Text textTransform="capitalize">
                            {getDate(props.startTime, "EEEE d MMM", lang)}
                        </Text>
                    </HStack>
                )}
            </Box>
        </Flex>
    );
};
