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
import { Jobs, JobCategory } from "../../types/strapi";
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
import { JobCard } from "components/feed/JobCard";
import { Divider } from "components/Divider";

interface Props {
    jobs: Jobs[];
    categories: JobCategory[];
}

const JobFeedView = ({ jobs, categories: baseCategories }: Props) => {
    const router = useRouter();
    const isAboveSm = useBreakpointValue({ base: false, sm: true });
    const isAboveLg = useBreakpointValue({ base: false, lg: true });

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

    const filters = ["plats", "roll", "bransch"];

    const shorten = (array: any[], to: number = 5) =>
        array.slice(0, Math.min(array.length, to));

    return (
        <Flex direction={{ base: "column", sm: "row" }} bg="gray.100">
            {!isAboveSm && (
                <VStack spacing={4} pb={4} w="full" bg="gray.50">
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
            {isAboveSm && (
                <Sidebar
                    routes={routes}
                    categories={categories.map((cat) => ({
                        label: cat.label,
                        query: `?=${cat.label}`,
                    }))}
                />
            )}
            <Box>
                {!isAboveLg && (
                    <>
                        <HStack spacing={4} p={4}>
                            {filters.map((f) => (
                                <Box
                                    as="button"
                                    key={f}
                                    bg="gray.900"
                                    color="white"
                                    px={4}
                                    py={2}
                                    fontWeight="bold"
                                    _hover={{
                                        bg: "gray.700",
                                    }}
                                    textTransform="capitalize"
                                >
                                    {f}
                                </Box>
                            ))}
                        </HStack>
                        <Divider />
                    </>
                )}
                <Flex>
                    <VStack spacing={4} w={{ base: "full", lg: "60%" }}>
                        <Feed setFeed={() => jobs} _direction="vertical">
                            {(item, key) => {
                                if (isAboveSm) {
                                    return <JobCard key={key} item={item} />;
                                }
                                return <JobCard key={key} item={item} />;
                            }}
                        </Feed>
                    </VStack>
                    {isAboveLg && (
                        <Flex
                            m={4}
                            justify="center"
                            align="center"
                            minW="250px"
                            flexGrow={1}
                            h="200px"
                            bg="white"
                            rounded="md"
                        >
                            <Text>Filtrering</Text>
                        </Flex>
                    )}
                </Flex>
            </Box>
        </Flex>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data } = await strapi.query<{
        jobs: Jobs[];
        jobCategories: JobCategory[];
    }>({
        query: gql`
            query {
                jobs {
                    slug
                    title
                    published_at
                    deadlineDate
                    jobCategory {
                        name
                    }
                    year {
                        year
                    }
                    company {
                        name
                        logo {
                            url
                            width
                            height
                            alternativeText
                        }
                        backgroundColor
                        sponsor
                    }
                    location
                    position
                }
                jobCategories {
                    name
                }
            }
        `,
    });
    return {
        props: {
            jobs: data.jobs,
            categories: data.jobCategories,
        },
    };
};

export default JobFeedView;
