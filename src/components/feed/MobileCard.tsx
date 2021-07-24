import { Flex, Heading, Spacer, Avatar, Text } from "@chakra-ui/react";
import React from "react";
import { getDate } from "utils/dates";
import { estimateReadingMinutes } from "utils/text";

export const MobileCard = ({ item }: any) => {
    return (
        <Flex
            rounded="md"
            align="flex-end"
            backgroundImage={`url(${item.imageUrl})`}
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center"
            h="400px"
            w="70vw"
            p={4}
        >
            <Flex h="60%" w="full" direction="column">
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
                <Flex align="center">
                    <Avatar
                        size="sm"
                        name={item.author.committee}
                        src={undefined}
                    />
                    <Spacer />
                    <Text
                        textTransform="capitalize"
                        color="whiteAlpha.700"
                        size="sm"
                    >
                        {getDate(item.createdAt, "dd MMM")}
                    </Text>
                </Flex>
                <Flex
                    mt={2}
                    justify="space-between"
                    w="full"
                    color="whiteAlpha.700"
                    fontSize="sm"
                >
                    <Text>{item.author.name}</Text>
                    <Text>&bull;</Text>
                    <Text>
                        {estimateReadingMinutes({
                            text: item.description,
                        })}
                    </Text>
                    <Text>&bull;</Text>
                    <Text>0 reads</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};
