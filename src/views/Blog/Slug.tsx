import {
    Flex,
    Box,
    Stack,
    Heading,
    useBreakpointValue,
    Icon,
    VStack,
    HStack,
    Button,
} from "@chakra-ui/react";
import { useState } from "react";
import AccessibleLink from "components/AccessibleLink";
import { MDXLayout } from "components/mdx/Layout";
import { NextImage } from "components/NextImage";
import { useSanity } from "hooks/use-check-error";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import Image from "next/image";
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

    const [imageFormat, setImageFormat] = useState(false);

    const changeImageFormat = () => {
        setImageFormat(!imageFormat);
    };

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
                    <Box
                        h={{ base: "30vh", md: "40vh", lg: "50vh" }}
                        w="100%"
                        pos="relative"
                        overflow="hidden"
                    >
                        <Image
                            width={image.width as number}
                            height={image.height as number}
                            src={image.url as string}
                            layout="fill"
                            objectFit={imageFormat ? "contain" : "cover"}
                            objectPosition="center"
                            priority
                        />
                    </Box>
                )}
                <HStack
                    px={{ base: 4, lg: 12 }}
                    pt={{ base: 4, lg: 8 }}
                    justifyContent="space-between"
                >
                    <AccessibleLink
                        href="/blog"
                        textDecoration="none"
                        _hover={{ textDecoration: "none" }}
                    >
                        <HStack>
                            <Icon as={IoMdArrowDropleft} />
                            <p>{t("common:back")}</p>
                        </HStack>
                    </AccessibleLink>
                    <Button size="xs" onClick={changeImageFormat}>
                        Toggle image format
                    </Button>
                </HStack>

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
                        rounded="2em"
                        borderWidth="1px"
                        borderColor="gray.200"
                        minH="550px"
                        bg="white"
                        w="full"
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
