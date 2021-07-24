import {
    Avatar,
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Spacer,
    Text,
    Image,
    VStack,
    useMediaQuery,
    useBreakpointValue,
} from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import AccessibleLinkOverlay from "components/AccessibleLinkOverlay";
import { Card } from "components/feed/Card";
import { Feed } from "components/feed/Feed";
import { MobileCard } from "components/feed/MobileCard";
import { RouteItem } from "components/sidebar/Pages";
import { Sidebar } from "components/sidebar/Sidebar";
import strapi, { gql } from "lib/strapi";
import { GetStaticProps } from "next";
import router from "next/router";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { IoShareSocial } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
import { Post, Category } from "types/strapi";
import { getDate, getTimeLeft } from "utils/dates";
import { imageSource } from "utils/images";
import { estimateReadingMinutes } from "utils/text";

interface Props {
    posts: Post[];
    categories: Category[];
}

const Home = ({ posts, categories: baseCategories }: Props) => {
    const isAboveSm = useBreakpointValue({ base: false, sm: true });

    // TODO: connect to i18n
    const routes = [
        { label: "Händelser", icon: HiHome, href: "/" },
        { label: "Event", icon: MdEvent, href: "/event" },
        {
            label: "Jobb",
            icon: RiUserSearchFill,
            href: "/jobb",
        },
    ];
    const categories = baseCategories.map((category) => ({
        label: category.name as string,
        query: `?=${category.name}`,
    }));
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
                            <Text key={cat.label}>{cat.label}</Text>
                        ))}
                    </HStack>
                </VStack>
            )}
            {isAboveSm && <Sidebar routes={routes} categories={categories} />}
            <Feed setFeed={() => posts}>
                {(item, key) => {
                    if (isAboveSm) {
                        return <Card item={item} />;
                    }
                    return <MobileCard key={key} item={item} />;
                }}
            </Feed>
        </Flex>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data } = await strapi.query<{
        posts: Post[];
        categories: Category[];
    }>({
        query: gql`
            query {
                posts {
                    slug
                    banner {
                        url
                        width
                        height
                        alternativeText
                    }
                    description
                    committee {
                        name
                    }
                    title
                    published_at
                    body
                }
                categories {
                    name
                }
            }
        `,
    });
    return {
        props: {
            posts: data.posts,
            categories: data.categories,
        },
    };
};

export default Home;
