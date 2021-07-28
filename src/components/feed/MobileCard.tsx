import { Flex, Heading, Spacer, Avatar, Text, Box } from "@chakra-ui/react";
import { NextImage } from "components/NextImage";
import React from "react";
import { Post } from "types/strapi";
import { getDate } from "utils/dates";
import { imageProvider } from "utils/images";
import { estimateReadingMinutes } from "utils/text";

interface Props {
    item: Post;
    priority: boolean;
}

export const MobileCard = ({ item, priority }: Props) => {
    return (
        <Flex
            position="relative"
            rounded="md"
            align="flex-end"
            overflow="hidden"
            h="400px"
            w="70vw"
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
                            priority={priority}
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
            <Flex h="60%" w="full" direction="column" p={4} zIndex="2">
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
                        name={item?.committee?.name}
                        src={undefined}
                    />
                    <Spacer />
                    <Text
                        textTransform="capitalize"
                        color="whiteAlpha.700"
                        size="sm"
                    >
                        {getDate(item.published_at, "dd MMM")}
                    </Text>
                </Flex>
                <Flex
                    mt={2}
                    justify="space-between"
                    w="full"
                    color="whiteAlpha.700"
                    fontSize="sm"
                >
                    <Text>{item?.committee?.name ?? "---"}</Text>

                    <Text>
                        {estimateReadingMinutes({
                            text: item.description + item.body,
                        })}
                    </Text>
                    {/*<Text>0 reads</Text>*/}
                </Flex>
            </Flex>
        </Flex>
    );
};
