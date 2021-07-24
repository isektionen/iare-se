import { Flex, Heading, Spacer, Avatar, Text } from "@chakra-ui/react";
import React from "react";
import { getDate, getTimeLeft } from "utils/dates";
import { imageProvider } from "utils/images";
import { estimateReadingMinutes } from "utils/text";

export const MobileEventCard = ({ item }: any) => {
    return (
        <Flex
            rounded="md"
            align="flex-end"
            background={`linear-gradient(0deg, rgba(0,0,0,0.75), rgba(0,0,0,0.05)), url(${imageProvider(
                { file: item.banner.url }
            )})`}
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center"
            h="400px"
            w="70vw"
            p={4}
        >
            <Flex h="45%" w="full" direction="column">
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
    );
};
