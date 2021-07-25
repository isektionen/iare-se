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
import { Card } from "components/feed/Card";
import { MobileEventCard } from "components/feed/MobileEventCard";
import { RouteItem } from "components/sidebar/Pages";
import { EventCard } from "components/feed/EventCard";
import { SmallCard } from "components/feed/SmallCard";

interface Props {
    events: Event[];
    categories: EventCategory[];
}

const EventFeedView = ({ events, categories }: Props) => {
    const router = useRouter();
    const isAboveSm = useBreakpointValue({ base: false, sm: true });

    const routes = [
        { label: "Händelser", icon: HiHome, href: "/" },
        { label: "Event", icon: MdEvent, href: "/event" },
        {
            label: "Jobb",
            icon: RiUserSearchFill,
            href: "/jobb",
        },
    ];

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
        <Flex direction={{ base: "column", sm: "row" }}>
            {!isAboveSm && (
                <VStack spacing={4} pb={4} w="full">
                    <Flex w="full" px={4} justify="space-evenly">
                        {routes.map((route) => (
                            <RouteItem key={route.label} {...route} />
                        ))}
                    </Flex>
                    <HStack spacing={4} w="full" px={4} fontWeight="bold">
                        <Text>Alla kategorier</Text>
                        {categories.map((cat) => (
                            <Text key={cat.name}>{cat.name}</Text>
                        ))}
                    </HStack>
                </VStack>
            )}
            {isAboveSm && (
                <Sidebar
                    routes={routes}
                    categories={categories.map((cat) => ({
                        label: cat.name,
                        query: `?=${cat.name}`,
                    }))}
                />
            )}
            <VStack spacing={4} w="full" bg="gray.100" overflow="scroll">
                <Feed setFeed={() => shorten(current)}>
                    {(item, key) => {
                        if (isAboveSm) {
                            return <EventCard key={key} item={item} />;
                        }
                        return <MobileEventCard key={key} item={item} />;
                    }}
                </Feed>
                <HFeed setFeed={() => shorten(past)}>
                    {(item, key) => <SmallCard key={key} {...item} />}
                </HFeed>
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
                    committee {
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
