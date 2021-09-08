import {
    HStack,
    Text,
    VStack,
    useBreakpointValue,
    Flex,
} from "@chakra-ui/react";
import { Card } from "components/feed/Card";
import { Feed } from "components/feed/Feed";
import { MobileCard } from "components/feed/MobileCard";
import { RouteItem } from "components/sidebar/Pages";
import { Sidebar } from "components/sidebar/Sidebar";
import { useSearch } from "hooks/use-search";
import strapi, { gql } from "lib/strapi";
import { GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import router from "next/router";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { IoShareSocial } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
import {
    fetchHydration,
    getHeader,
    useHydrater,
    usePageMenu,
} from "state/layout";
import { DefHeader, LayoutProps } from "types/global";
import { Post, Category } from "types/strapi";
import { getTranslatedRoutes } from "utils/sidebar";

interface Props {
    posts: Post[];
    categories: Category[];
}

const FeedView = ({
    header,
    footer,
    posts: basePosts,
    categories: baseCategories,
}: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    usePageMenu({
        label: "",
        viewports: ["drawer"],
        items: [
            {
                label: "Händelser",
                href: "/",
            },
            {
                label: "Event",
                href: "/event",
            },
            {
                label: "Jobb",
                href: "/jobb",
            },
        ],
    });
    const isAboveSm = useBreakpointValue({ base: false, sm: true });
    const { t, lang } = useTranslation("feed");
    const { filter, setQuery, clearQuery } = useSearch(
        () => basePosts,
        (item) => ({
            category: item.categories
                ? item.categories.map((cat) => cat?.name)
                : [],
        })
    );

    const routes = getTranslatedRoutes(t);

    const posts = filter(basePosts);
    const categories = [
        {
            label: t("sidebarAllCategories"),
            query: clearQuery,
        },
        ...baseCategories.map((category) => ({
            label: category.name as string,
            query: () => setQuery({ category: category.name as string }),
        })),
    ];
    return <Flex direction={{ base: "column", sm: "row" }}></Flex>;
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
                    categories {
                        name
                    }
                }
                categories {
                    name
                }
            }
        `,
    });
    return {
        props: {
            ...(await fetchHydration()),
            posts: data.posts,
            categories: data.categories,
        },
        revalidate: 20,
    };
};

export default FeedView;
