import { Flex, Heading, Spacer, Avatar, Text, Box } from "@chakra-ui/react";
import React from "react";
import { getDate, getTimeLeft } from "utils/dates";
import { imageProvider } from "utils/images";
import { estimateReadingMinutes } from "utils/text";

import NextImage from "next/image";
import AccessibleLink from "components/AccessibleLink";
import AccessibleLinkOverlay from "components/AccessibleLinkOverlay";

export const MobileEventCard = ({ item }: any) => {
    return (
        <AccessibleLink href={("../event/" + item.slug) as string}>
            <Flex
                rounded="md"
                align="flex-end"
                h="400px"
                w="70vw"
                position="relative"
                overflow="hidden"
            >
                <Box
                    position="absolute"
                    top="0"
                    bottom="0"
                    w="full"
                    overflow="hidden"
                    rounded="md"
                    zIndex="0"
                >
                    <Box position="relative" h="full" w="full">
                        {item.banner && (
                            <NextImage
                                src={item.banner.url}
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                            />
                        )}
                    </Box>
                </Box>
                <Box
                    position="absolute"
                    h="full"
                    w="full"
                    bgGradient="linear(to-t, blackAlpha.700, blackAlpha.50)"
                    zIndex="1"
                />

                <Flex h="45%" w="full" direction="column" p={4} zIndex="2">
                    <Heading
                        size="lg"
                        textTransform="capitalize"
                        fontWeight="bold"
                        w="full"
                        color="white"
                    >
                        {item.title}
                    </Heading>
                    <Spacer />
                    <Flex align="center" color="whiteAlpha.700">
                        <Avatar
                            size="sm"
                            name={item.committee.name}
                            src={undefined}
                        />
                        <Spacer />
                        <Text size="sm">
                            Osan stänger {getTimeLeft(item.deadline, true)}
                        </Text>
                    </Flex>
                    <Flex
                        mt={2}
                        justify="space-between"
                        w="full"
                        color="whiteAlpha.700"
                        fontSize="sm"
                    >
                        <Text>{item.committee.name}</Text>
                        <Text>&bull;</Text>
                        <Text>0 osade</Text>
                        <Text>&bull;</Text>
                        <Text>0 reads</Text>
                    </Flex>
                </Flex>
            </Flex>
        </AccessibleLink>
    );
};
