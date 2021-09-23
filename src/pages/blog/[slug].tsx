import strapi, { extractLocales, gql, queryLocale } from "../../lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { Company, Jobs, Post, UploadFile } from "../../types/strapi";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import { MDXLayout } from "../../components/mdx/Layout";
import { LayoutWrapper } from "../../components/layout/LayoutWrapper";
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    Icon,
    Spacer,
    Stack,
    StackDivider,
    Text,
    useBreakpointValue,
    VStack,
} from "@chakra-ui/react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextImage } from "../../components/NextImage";
import { getSchoolYear } from "../../utils/dates";
import { useRouter } from "next/router";
import { DeadlineCounter } from "../../components/DeadlineCounter";
import { isBefore } from "date-fns";
import AccessibleLink from "../../components/AccessibleLink";
import { DefHeader, LayoutProps } from "../../types/global";
import { fetchHydration, getHeader, useHydrater } from "../../state/layout";
import { IoMdArrowDropleft } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";
import { useSanity } from "../../hooks/use-check-error";
import _ from "underscore";
import { useSetLocaleSlug } from "../../state/locale";
import { LinkComponent } from "../../components/LinkComponent";
import defaultPost from "../../../prefetch/static/blog.json";
interface Props {
    post: Post;
    mdx: MDXRemoteSerializeResult;
}

const PostView = ({
    header,
    footer,
    /* @ts-ignore */
    post = defaultPost,
    mdx,
    error,
    localeSlugs,
}: LayoutProps<Props>) => {
    const { t } = useTranslation();
    useSanity(error);
    useSetLocaleSlug(localeSlugs);
    useHydrater({ header, footer });

    const isAboveLg = useBreakpointValue({ base: false, lg: true });

    const image = post.banner as UploadFile;

    return (
        <Flex overflow="hidden" direction="column" bg="white" pos="relative">
            {image && (
                <Flex
                    maxH="55vh"
                    w="full"
                    pos="relative"
                    overflow="hidden"
                    _after={{
                        content: "''",
                        position: "absolute",
                        bottom: 0,
                        top: 0,
                        left: 0,
                        right: 0,
                        bg: "linear-gradient(180deg, rgba(0,0,0,0) 65%, rgba(0,0,0,0.65) 100%)",
                    }}
                >
                    <NextImage
                        w="full"
                        width={2560}
                        height={1200}
                        src={image.url as string}
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        priority
                    />
                </Flex>
            )}
            <Box px={{ base: 4, lg: 12 }} pt={{ base: 4, lg: 8 }}>
                <AccessibleLink
                    href="/blog"
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                >
                    <Icon as={IoMdArrowDropleft} /> {t("common:back")}
                </AccessibleLink>
            </Box>

            <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={{ base: 6, lg: 16 }}
                px={{ base: 4, lg: 12 }}
                pt={{ base: 4, lg: 8 }}
                pb={{ base: 4, md: 16 }}
            >
                <Flex
                    overflow="hidden"
                    flexDirection="column"
                    flex={1}
                    p={4}
                    shadow="2xl"
                    rounded="md"
                    borderWidth="1px"
                    borderColor="gray.200"
                    minH="550px"
                    bg="white"
                    w="full"
                    pos="relative"
                >
                    <Heading pb={8}>{post.title}</Heading>
                    {mdx && <MDXLayout source={mdx} />}
                </Flex>
            </Stack>
        </Flex>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await strapi.query<{ posts: Post[] }>({
        query: gql`
            query {
                posts {
                    slug
                }
            }
        `,
    });

    return {
        paths: data.posts.map((e) => ({
            params: {
                slug: e.slug as string,
            },
        })),
        fallback: true,
    };
};
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const { data, error } = await queryLocale<{ posts: Post[] }>`
    query {
        posts(locale: ${locale}, where: {slug: ${params?.slug as string}}) {
          title
          committee {
            name
          }
          body
          banner {
            url
            width
            height
          }
          localizations {
            locale
            slug
          }
          
        }
      }`;

    const post = _.first(data.posts) || null;

    const localeSlugs = extractLocales(
        { post },
        ["post"],
        ["locale", "slug"]
    ).map((item) => ({
        ...item,
        slug:
            item.locale === "sv"
                ? `/blog/${item.slug}`
                : `/${item.locale}/blog/${item.slug}`,
    }));

    const mdxSource = post?.body ? await serialize(post.body) : null;

    return {
        props: {
            error,
            localeSlugs,
            post,
            mdx: mdxSource,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default PostView;
