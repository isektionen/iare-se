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
import { Sidebar } from "components/sidebar/Sidebar";
import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { HiHome } from "react-icons/hi";
import { MdEvent } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
import { Jobs, JobCategory } from "../../types/strapi";
import _ from "underscore";

import { useRouter } from "next/router";
import { RouteItem } from "components/sidebar/Pages";

import { JobCard } from "components/feed/JobCard";
import { Divider } from "components/Divider";
import useTranslation from "next-translate/useTranslation";
import { getTranslatedRoutes } from "utils/sidebar";
import { fetchHydration, getHeader, useHydrater } from "state/layout";
import { DefHeader, LayoutProps } from "types/global";

interface Props {
    jobs: Jobs[];
    categories: JobCategory[];
}

const JobFeedView = ({
    header,
    footer,
    jobs,
    categories: baseCategories,
}: LayoutProps<Props>) => {
    useHydrater({ header });
    const { t } = useTranslation("feed");
    const isAboveSm = useBreakpointValue({ base: false, sm: true });
    const isAboveLg = useBreakpointValue({ base: false, lg: true });

    const routes = getTranslatedRoutes(t);

    const categories = baseCategories.map((category) => ({
        label: category.name as string,
        query: () => {},
    }));

    const filters = t("jobFilters", {}, { returnObjects: true }) as string[];

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
                </VStack>
            )}
            {isAboveSm && <Sidebar routes={routes} categories={categories} />}
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
                            {(item, key, priority) => {
                                if (isAboveSm) {
                                    return (
                                        <JobCard
                                            key={key}
                                            item={item}
                                            priority={priority}
                                        />
                                    );
                                }
                                return (
                                    <JobCard
                                        key={key}
                                        item={item}
                                        priority={priority}
                                    />
                                );
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
            ...(await fetchHydration()),
            jobs: data.jobs,
            categories: data.jobCategories,
        },
        revalidate: 20,
    };
};

export default JobFeedView;
