import {
    Flex,
    Box,
    Stack,
    Heading,
    useBreakpointValue,
    Icon,
} from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import { MDXLayout } from "components/mdx/Layout";
import { NextImage } from "components/NextImage";
import { useSanity } from "hooks/use-check-error";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { IoMdArrowDropleft } from "react-icons/io";
import { useHydrater } from "state/layout";
import { useSetLocaleSlug } from "state/locale";
import { LayoutProps } from "types/global";
import { Post, UploadFile } from "types/strapi";
import { makeTitle } from "utils/seo";
interface Props {
    post: Post;
    mdx: MDXRemoteSerializeResult;
}

const View = ({
    header,
    footer,
    post,
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
        <React.Fragment>
            <NextSeo
                title={makeTitle(
                    t("seo:blog-single.title", { blog: post.title })
                )}
            />

            <Flex
                overflow="hidden"
                pos="relative"
                direction="column"
                bg="white"
            >
                {image && (
                    <Flex maxH="55vh" w="full" overflow="hidden">
                        <NextImage
                            w="full"
                            width={2560}
                            height={1200}
                            src={image.url as string}
                            layout="fill"
                            objectFit="cover"
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
        </React.Fragment>
    );
};

export default View;
