import {
    Avatar,
    Badge,
    Box,
    Circle,
    Flex,
    Heading,
    HStack,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { NextImage, NextImageProps } from "../NextImage";
import React from "react";
import { FeedItem } from "./Feed";
import { getDate } from "utils/dates";

export const Card = (props: FeedItem) => {
    return (
        <Flex
            direction={{ base: "column", lg: "row" }}
            bg="white"
            rounded="md"
            justify="center"
            p={1}
        >
            <NextImage
                rounded="base"
                overflow="hidden"
                w={{ base: "full", lg: "48%" }}
                maxH={{ base: 80, lg: "full" }}
                layout="responsive"
                objectFit="fill"
                src={props.imageUrl}
            />
            <Spacer />
            <Flex direction="column" w={{ base: "full", lg: "50%" }} py={4}>
                <HStack spacing={2} w="full">
                    {props.categories.map((category) => (
                        <Badge key={category.label} variant="subtle">
                            {category.label}
                        </Badge>
                    ))}
                </HStack>
                <Heading as="h3" size="md" mb={8}>
                    {props.title}
                </Heading>
                <Text>{props.description}</Text>
                <HStack mt={6}>
                    <Avatar
                        size="sm"
                        name={props.author.name}
                        src={props.author.imageUrl}
                    />
                    <Box pl={2}>
                        <Box as="strong" fontWeight="bold">
                            {props.author.name}, {props.author.committee}
                        </Box>
                        <Box as="p">
                            {getDate(props.createdAt, "dd MMM yyyy")}
                        </Box>
                    </Box>
                </HStack>
            </Flex>
        </Flex>
    );
};
