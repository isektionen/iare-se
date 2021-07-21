import { Flex } from "@chakra-ui/react";
import { Feed } from "components/feed/Feed";
import { Sidebar } from "components/sidebar/Sidebar";
import React from "react";
import { HiHome } from "react-icons/hi";
import { MdEvent } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
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
                feed={[
                    {
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
            />
        </Flex>
    );
};
export default Home;
