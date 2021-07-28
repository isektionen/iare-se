import {
    Avatar,
    Badge,
    Box,
    Button,
    Circle,
    Flex,
    Heading,
    HStack,
    IconButton,
    Spacer,
    Text,
    Image,
    Icon,
} from "@chakra-ui/react";
import React from "react";
import { FeedItem } from "./Feed";
import { getDate, getTimeLeft } from "utils/dates";
import router from "next/router";
import { IoShareSocial } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { imageProvider, imageSource } from "utils/images";

import AccessibleLink from "components/AccessibleLink";
import { NextImage } from "components/NextImage";

export const EventCard = ({ item, priority }: any) => {
    return (
        <Flex
            direction={{ base: "column", lg: "row" }}
            bg="white"
            rounded="md"
            w="full"
            overflow="hidden"
        >
            {item.banner && (
                <AccessibleLink href={("../event/" + item.slug) as string}>
                    <NextImage
                        src={item.banner.url}
                        layout="intrinsic"
                        width={item.banner.width as number}
                        height={item.banner.height as number}
                        priority={priority}
                    />
                </AccessibleLink>
            )}
            <Flex direction="column" w="full" p={8} h="full">
                <Flex w="full" justify="space-between" align="flex-start">
                    <Box>
                        {item.category && (
                            <HStack spacing={2}>
                                <Badge variant="subtle">
                                    {item.category.name}
                                </Badge>
                            </HStack>
                        )}
                        <Heading
                            as="h3"
                            size="xl"
                            mb={4}
                            textTransform="capitalize"
                        >
                            <AccessibleLink
                                href={("../event/" + item.slug) as string}
                            >
                                {item.title}
                            </AccessibleLink>
                        </Heading>
                    </Box>
                </Flex>
                <Text noOfLines={8} mb={8}>
                    {item.description}
                </Text>
                <Spacer />
                <HStack mb={4}>
                    <Icon as={AiOutlineClockCircle} />
                    <Text size="sm">
                        Osan stänger {getTimeLeft(item.deadline, true)}
                    </Text>
                </HStack>
                <HStack spacing={4}>
                    <Button
                        flex={1}
                        variant="iareSolid"
                        onClick={() => router.push("../event/" + item.slug)}
                    >
                        OSA
                    </Button>
                    <IconButton variant="iareSolid" aria-label="socials">
                        <IoShareSocial />
                    </IconButton>
                </HStack>
            </Flex>
        </Flex>
    );
};
