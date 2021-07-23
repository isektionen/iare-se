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
} from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import AccessibleLinkOverlay from "components/AccessibleLinkOverlay";
import { Feed } from "components/feed/Feed";
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

const Home = () => {
    return (
        <Flex>
            <Sidebar
                routes={[
                    { label: "Händelser", icon: HiHome, href: "/" },
                    { label: "Event", icon: MdEvent, href: "/event" },
                    { label: "Jobb", icon: RiUserSearchFill, href: "/jobb" },
                ]}
                categories={[
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
                ]}
            />
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
                {(item) => (
                    <Flex
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
                                h={{ base: "60%", xl: "lg" }}
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
                            p={8}
                            h={{ base: "40%", xl: "full" }}
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
                                        size="xl"
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
                            <Text noOfLines={8} mb={8}>
                                {item.description}
                            </Text>
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
                )}
            </Feed>
        </Flex>
    );
};
export default Home;
