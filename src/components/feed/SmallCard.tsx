import {
    Badge,
    Box,
    Flex,
    Heading,
    HStack,
    Icon,
    Spacer,
    Text,
} from "@chakra-ui/react";
import React from "react";

import { AiOutlineClockCircle } from "react-icons/ai";
import { getTimeLeft } from "utils/dates";
import { MdLocationOn, MdPeople } from "react-icons/md";
import AccessibleLinkOverlay from "components/AccessibleLinkOverlay";
import { Event } from "types/strapi";

export const SmallCard = (props: Event) => {
    return (
        <AccessibleLinkOverlay href={"event/" + props.slug}>
            <Flex
                direction="column"
                bg="white"
                rounded="md"
                p={4}
                h={48}
                w={80}
            >
                {!props.category && (
                    <Flex justify="space-between" w="full">
                        <Heading as="h4" size="md">
                            {props.title}
                        </Heading>
                        <HStack>
                            <Icon as={AiOutlineClockCircle} />
                            <Text size="sm">
                                {getTimeLeft(props.deadline, true)}
                            </Text>
                        </HStack>
                    </Flex>
                )}
                {props.category && (
                    <>
                        <Flex justify="space-between" w="full">
                            <Badge variant="subtle">
                                {props.category.name}
                            </Badge>
                            <HStack>
                                <Icon as={AiOutlineClockCircle} />
                                <Text size="sm">
                                    {getTimeLeft(props.deadline, true)}
                                </Text>
                            </HStack>
                        </Flex>
                        <Heading as="h4" size="md" w="full">
                            {props.title}
                        </Heading>
                    </>
                )}

                <Spacer />
                <HStack spacing={6}>
                    {props.place?.name && (
                        <Flex align="center">
                            <Icon as={MdLocationOn} mr={2} />
                            {props.place.name}
                        </Flex>
                    )}
                    {/*
<Flex align="center">
                    <Icon as={MdPeople} mr={2} />0 osade
                </Flex> */}
                </HStack>
            </Flex>
        </AccessibleLinkOverlay>
    );
};
