import {
    Avatar,
    Box,
    Flex,
    Heading,
    Stack,
    VStack,
    Wrap,
    Text,
} from "@chakra-ui/react";
import { MDXLayout } from "components/mdx/Layout";
import { NextImage } from "components/NextImage";
import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import { fetchHydration, useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { Chapter, Committee, Representative, UploadFile } from "types/strapi";
import _ from "underscore";
interface Props {
    title: string;
    images: UploadFile[];
    board: Committee;
    mdx: MDXRemoteSerializeResult;
}

const View = ({
    title,
    images,
    mdx,
    board,
    header,
    footer,
}: LayoutProps<Props>) => {
    useHydrater({ header, footer });
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
                <Wrap shouldWrapChildren>
                    {board.representatives?.map((rep) => {
                        const fullname =
                            rep?.user?.firstname + " " + rep?.user?.lastname;
                        const role = _.first(
                            rep?.committee_roles?.map((_role) => ({
                                role: _role?.role,
                                abbr: _role?.abbreviation?.toUpperCase(),
                            })) as { role: string; abbr: string }[]
                        );
                        const roleName =
                            role && role?.role?.length > 20
                                ? role?.abbr || role?.role.slice(0, 17) + "..."
                                : role?.role;
                        if (!rep) return <></>;
                        return (
                            <Box key={rep.id} p={2}>
                                <Avatar
                                    src={rep?.cover?.url}
                                    name={fullname}
                                    size="lg"
                                    rounded="sm"
                                    w="167px"
                                    h="250px"
                                    mb={4}
                                />

                                <Text fontSize="lg" textTransform="capitalize">
                                    {fullname}
                                </Text>
                                <Text textTransform="capitalize">
                                    {roleName}
                                </Text>
                            </Box>
                        );
                    })}
                </Wrap>
            </Box>
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
        </Stack>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {
        data: { chapter },
    } = await strapi.query<{ chapter: Chapter }>({
        query: gql`
            query {
                chapter {
                    content
                    title
                    board {
                        representatives(where: { hidden: false }) {
                            id
                            user {
                                firstname
                                lastname
                            }
                            cover {
                                url
                            }
                            committee_roles {
                                role
                                abbreviation
                                committee_objectives {
                                    objective
                                }
                            }
                        }
                    }
                    images {
                        id
                        url
                    }
                }
            }
        `,
    });

    const objectives =
        chapter.board?.representatives
            ?.map((rep) =>
                rep?.committee_roles?.map((com) =>
                    com?.committee_objectives?.map((obj) => obj?.objective)
                )
            )
            .flat()
            .flat() ?? [];
    const commonObjective = _.chain(objectives)
        .countBy()
        .pairs()
        .map(([k, v]) => ({ key: k, value: v }))
        .max("value")
        .get("key")
        .value();

    const mdxSource = await serialize(chapter.content as string);

    return {
        props: {
            mdx: mdxSource,
            title: chapter.title,
            images: chapter.images,
            board: {
                ...chapter.board,
                representatives: _.chain(
                    chapter?.board?.representatives as Representative[]
                )
                    .map((rep) => {
                        return {
                            ...rep,
                            committee_roles: rep?.committee_roles?.filter(
                                (role) =>
                                    role?.committee_objectives
                                        ?.map((obj) => obj?.objective)
                                        .includes(commonObjective as string)
                            ),
                        };
                    })
                    .value(),
            },
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default View;
