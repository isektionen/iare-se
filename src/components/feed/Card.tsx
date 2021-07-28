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
} from "@chakra-ui/react";
import React from "react";
import { FeedItem } from "./Feed";
import { getDate } from "utils/dates";
import router from "next/router";
import { IoShareSocial } from "react-icons/io5";
import { Category, Post } from "types/strapi";
import { imageProvider, imageSource } from "utils/images";

import AccessibleLink from "components/AccessibleLink";
import { NextImage } from "components/NextImage";
interface Props {
    item: Post;
    priority: boolean;
}

export const Card = ({ item, priority }: Props) => {
    return (
        <Flex
            direction={{ base: "column", lg: "row" }}
            bg="white"
            rounded="lg"
            w="full"
            overflow="hidden"
            maxH="4xl"
        >
            {item.banner && (
                <AccessibleLink href={("../post/" + item.slug) as string}>
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
                        {item.categories && (
                            <HStack spacing={2}>
                                {item.categories.map((cat) => (
                                    <Badge key={cat?.name} variant="subtle">
                                        {cat?.name}
                                    </Badge>
                                ))}
                            </HStack>
                        )}
                        <Heading
                            as="h3"
                            size="xl"
                            mb={4}
                            textTransform="capitalize"
                        >
                            <AccessibleLink
                                href={("../post/" + item.slug) as string}
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
                <HStack spacing={4} w="full">
                    <IconButton
                        variant="iareSolid"
                        aria-label="socials"
                        cursor="not-allowed" // TODO: fix sharing capabilities
                    >
                        <IoShareSocial />
                    </IconButton>
                </HStack>
            </Flex>
        </Flex>
    );
};
