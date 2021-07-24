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
import router from "next/router";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { IoShareSocial } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
import { getDate, getTimeLeft } from "utils/dates";
import { imageSource } from "utils/images";
import { estimateReadingMinutes } from "utils/text";

/**
 * 
 * <Flex
                        direction={{ base: "column", xl: "row" }}
                        bg="white"
                        rounded="md"
                        w="full"
                        overflow="hidden"
                        maxH="4xl"
                    >
                        {item.imageUrl && (
                            <Box
                                minW={{ base: "full", xl: "50%" }}
                                h={{ base: "40%", xl: "lg" }}
                                overflow="hidden"
                            >
                                <AccessibleLink href={"posts/" + item.slug}>
                                    <Image
                                        src={imageSource(
                                            undefined,
                                            "./news-image.png"
                                        )}
                                        alt={"banner"}
                                        objectFit="cover"
                                        w="full"
                                        h="full"
                                        objectPosition="50% 50%"
                                    />
                                </AccessibleLink>
                            </Box>
                        )}
                        <Flex
                            direction="column"
                            w="full"
                            p={{ base: 4, md: 8 }}
                            h={{ base: "60%", xl: "full" }}
                        >
                            <Flex
                                w="full"
                                justify="space-between"
                                align="flex-start"
                            >
                                <Box>
                                    {item.categories && (
                                        <HStack spacing={2}>
                                            {item.categories.map((cat) => (
                                                <Badge
                                                    key={cat.label}
                                                    variant="subtle"
                                                >
                                                    {cat.label}
                                                </Badge>
                                            ))}
                                        </HStack>
                                    )}
                                    <Heading
                                        as="h3"
                                        size="md"
                                        mb={4}
                                        textTransform="capitalize"
                                    >
                                        <AccessibleLink
                                            href={"posts/" + item.slug}
                                        >
                                            {item.title}
                                        </AccessibleLink>
                                    </Heading>
                                </Box>
                            </Flex>
                            <Text noOfLines={8}>{item.description}</Text>
                            <Spacer />
                            <HStack mt={6}>
                                <Avatar
                                    size="sm"
                                    name={item.author.name}
                                    src={undefined}
                                />
                                <Box pl={2}>
                                    <Box as="strong" fontWeight="bold">
                                        {item.author.name},{" "}
                                        {item.author.committee}
                                    </Box>
                                    <Box as="p">
                                        {getDate(item.createdAt, "dd MMM yyyy")}
                                    </Box>
                                </Box>
                            </HStack>
                        </Flex>
                    </Flex>
 */

const Home = () => {
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
    const categories = [
        {
            label: "Studier",
            query: "?=studier",
        },
        {
            label: "Pubbar",
            query: "?=pubbar",
        },
        {
            label: "Utbyte",
            query: "?=utbyte",
        },
    ];
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
            <Feed
                setFeed={() => [
                    {
                        slug: "#",
                        imageUrl: "/news-image.png",
                        categories: [
                            {
                                label: "Studier",
                            },
                        ],
                        title: "Social security is rethinking how it runs customer service after covid",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam sit amet nisl...",
                        author: {
                            name: "John Landeholt",
                            committee: "Webgroup",
                        },
                        createdAt: "2021-07-20T10:53:26.694Z",
                    },
                    {
                        slug: "#",
                        imageUrl: "/news-image.png",
                        categories: [
                            {
                                label: "Studier",
                            },
                        ],
                        title: "Detta är en titel",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam sit amet nisl...",
                        author: {
                            name: "John Landeholt",
                            committee: "Webgroup",
                        },
                        createdAt: "2021-07-20T10:53:26.694Z",
                    },
                    {
                        slug: "#",
                        imageUrl: "/logo.svg",
                        categories: [
                            {
                                label: "Studier",
                            },
                        ],
                        title: "Detta är en titel",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam sit amet nisl...",
                        author: {
                            name: "John Landeholt",
                            committee: "Webgroup",
                        },
                        createdAt: "2021-07-20T10:53:26.694Z",
                    },
                ]}
            >
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
export default Home;
