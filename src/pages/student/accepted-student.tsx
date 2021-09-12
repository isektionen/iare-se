import { Box, Heading, Stack, VStack } from "@chakra-ui/react";
import { MDXLayout } from "components/mdx/Layout";
import { NextImage } from "components/NextImage";
import { useSanity } from "hooks/use-check-error";
import strapi, { gql, queryLocale } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import { fetchHydration, useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { AcceptedStudent, UploadFile } from "types/strapi";

interface Props {
    title: string;
    images: UploadFile[];
    mdx: MDXRemoteSerializeResult;
}

const View = ({
    title,
    images,
    mdx,
    header,
    footer,
    error,
}: LayoutProps<Props>) => {
    useSanity(error);
    useHydrater({ header, footer });

    const hasImages = images.length > 0;

    return (
        <Stack
            py={8}
            px={{ base: 4, md: 12 }}
            spacing={8}
            direction={{ base: "column-reverse", md: "row" }}
        >
            <Box minW={{ base: "full", md: "60%" }}>
                <Heading mb={8}>{title}</Heading>
                {mdx && <MDXLayout source={mdx} flex={1} />}
            </Box>
            {hasImages && (
                <VStack spacing={4} w={{ base: "full", md: "40%" }}>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const { data, error } = await queryLocale<{
        acceptedStudent: AcceptedStudent;
    }>`
    query {
        acceptedStudent(locale: ${locale}) {
            content
            title
            images {
                id
                url
            }
        }
    }
`;
    const mdxSource = data.acceptedStudent?.content
        ? await serialize(data.acceptedStudent.content)
        : null;

    return {
        props: {
            error,
            images: data.acceptedStudent?.images,
            title: data.acceptedStudent?.title,
            mdx: mdxSource,

            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default View;
