import { Box, Heading, Stack, VStack } from "@chakra-ui/react";
import { MDXLayout } from "components/mdx/Layout";
import { NextImage } from "components/NextImage";
import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import { fetchHydration, useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { AssumedStudent, UploadFile } from "types/strapi";

interface Props {
    title: string;
    images: UploadFile[];
    mdx: MDXRemoteSerializeResult;
}

const View = ({ title, images, mdx, header, footer }: LayoutProps<Props>) => {
    useHydrater({ header, footer });

    const hasImages = images.length > 0;

    return (
        <Stack
            py={8}
            px={{ base: 4, md: 12 }}
            spacing={8}
            direction={{ base: "column-reverse", md: "row" }}
        >
            <Box minW={{ base: "full", md: "70%" }}>
                <Heading mb={8}>{title}</Heading>
                <MDXLayout source={mdx} flex={1} />
            </Box>
            {hasImages && (
                <VStack spacing={4} w={{ base: "full", md: "30%" }}>
                    {images.map((image, i) => (
                        <NextImage
                            key={image.id}
                            src={image.url}
                            priority={i < 3}
                            width={900}
                            w="full"
                            height={600}
                            layout="intrinsic"
                        />
                    ))}
                </VStack>
            )}
        </Stack>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {
        data: { assumedStudent },
    } = await strapi.query<{ assumedStudent: AssumedStudent }>({
        query: gql`
            query {
                assumedStudent {
                    content
                    title
                    images {
                        id
                        url
                    }
                }
            }
        `,
    });
    const mdxSource = await serialize(assumedStudent.content as string);

    return {
        props: {
            images: assumedStudent.images,
            title: assumedStudent.title,
            mdx: mdxSource,

            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default View;
