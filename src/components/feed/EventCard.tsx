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
import { imageSource } from "utils/images";

export const EventCard = ({ item }: any) => {
    return (
        <Flex
            direction={{ base: "column", xl: "row" }}
            bg="white"
            rounded="md"
            w="full"
            overflow="hidden"
            maxH="4xl"
        >
            {item.banner && (
                <Box
                    minW={{ base: "full", xl: "50%" }}
                    h={{ base: "60%", xl: "lg" }}
                    overflow="hidden"
                >
                    <Image
                        src={imageSource(item.banner, "/news-image.png")}
                        alt={item.banner?.alternativeText ?? "banner"}
                        objectFit="cover"
                        w="full"
                        h="full"
                        objectPosition="50% 50%"
                    />
                </Box>
            )}
            <Flex
                direction="column"
                w="full"
                p={8}
                h={{ base: "40%", xl: "full" }}
            >
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
                            {item.title}
                        </Heading>
                    </Box>
                    <HStack>
                        <Icon as={AiOutlineClockCircle} />
                        <Text size="sm">
                            Osan stänger {getTimeLeft(item.deadline, true)}
                        </Text>
                    </HStack>
                </Flex>
                <Text noOfLines={8} mb={8}>
                    {item.description}
                </Text>
                <Spacer />
                <HStack spacing={4}>
                    <Button
                        flex={1}
                        variant="iareSolid"
                        onClick={() => router.push("event/" + item.slug)}
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
