import {
    Badge,
    Flex,
    Heading,
    HStack,
    VStack,
    Text,
    Image,
    Box,
    Icon,
    Spacer,
    Button,
    useBreakpointValue,
    useMediaQuery,
    IconButton,
} from "@chakra-ui/react";
import { Feed } from "components/feed/Feed";
import { HFeed } from "components/feed/HFeed";
import { Sidebar } from "components/sidebar/Sidebar";
import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { HiHome } from "react-icons/hi";
import { MdEvent } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
import { Event, EventCategory } from "../../types/strapi";
import _ from "underscore";
import { isAfter, isBefore } from "date-fns";
import { NextImage } from "components/NextImage";
import { imageSource } from "utils/images";
import { AiOutlineClockCircle } from "react-icons/ai";
import { getTimeLeft } from "utils/dates";
import { useRouter } from "next/router";
import { IoShareSocial } from "react-icons/io5";

interface Props {
    events: Event[];
    categories: EventCategory[];
}

const EventFeedView = ({ events, categories }: Props) => {
    const router = useRouter();
    const { current, past } = _.groupBy(
        _.sortBy(events, "deadline"),
        (item) => {
            return isAfter(new Date(item.deadline), new Date())
                ? "current"
                : "past";
        }
    );

    const [isRow] = useMediaQuery("(min-width: 1300px)");

    const shorten = (array: any[], to: number = 5) =>
        array.slice(0, Math.min(array.length, to));
    return (
        <Flex>
            <Sidebar
                routes={[
                    { label: "Händelser", icon: HiHome, href: "/" },
                    { label: "Event", icon: MdEvent, href: "/event" },
                    { label: "Jobb", icon: RiUserSearchFill, href: "/jobb" },
                ]}
                categories={
                    categories?.map((item) => ({
                        label: item.name,
                        query: `?=${item.name}`,
                    })) ?? []
                }
            />
            <VStack spacing={4} w="full" bg="gray.100">
                <Feed setFeed={() => shorten(current)}>
                    {(item, key) => (
                        <Flex
                            key={key}
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
                                        src={imageSource(
                                            item.banner,
                                            "/news-image.png"
                                        )}
                                        alt={
                                            item.banner?.alternativeText ??
                                            "banner"
                                        }
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
                                <Flex
                                    w="full"
                                    justify="space-between"
                                    align="flex-start"
                                >
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
                                            Osan stänger{" "}
                                            {getTimeLeft(item.deadline, true)}
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
                                        onClick={() =>
                                            router.push("event/" + item.slug)
                                        }
                                    >
                                        OSA
                                    </Button>
                                    <IconButton
                                        variant="iareSolid"
                                        aria-label="socials"
                                    >
                                        <IoShareSocial />
                                    </IconButton>
                                </HStack>
                            </Flex>
                        </Flex>
                    )}
                </Feed>
                <HFeed feed={shorten(past)} />
            </VStack>
        </Flex>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data } = await strapi.query<{
        events: Event[];
        eventCategories: EventCategory[];
    }>({
        query: gql`
            query {
                events {
                    title
                    slug
                    category {
                        name
                    }
                    place {
                        name
                    }
                    deadline
                    description
                    banner {
                        url
                        width
                        height
                        alternativeText
                    }
                }
                eventCategories {
                    name
                }
            }
        `,
    });
    return {
        props: {
            events: data.events,
            categories: data.eventCategories,
        },
    };
};

export default EventFeedView;
