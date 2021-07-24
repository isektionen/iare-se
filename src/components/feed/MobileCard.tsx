import { Flex, Heading, Spacer, Avatar, Text } from "@chakra-ui/react";
import React from "react";
import { Post } from "types/strapi";
import { getDate } from "utils/dates";
import { imageProvider } from "utils/images";
import { estimateReadingMinutes } from "utils/text";
interface Props {
    item: Post;
}

export const MobileCard = ({ item }: Props) => {
    return (
        <Flex
            rounded="md"
            align="flex-end"
            backgroundImage={
                item.banner
                    ? `linear-gradient(0deg, rgba(0,0,0,0.75), rgba(0,0,0,0.05)), url(${imageProvider(
                          { file: item.banner.url }
                      )})`
                    : "linear-gradient(0deg, rgba(0,0,0,0.75), rgba(0,0,0,0.05)), url(news-image.png)"
            }
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
