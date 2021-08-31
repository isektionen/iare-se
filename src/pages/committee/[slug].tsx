import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Sidebar } from "components/committee/Sidebar";
import { TableOfContent } from "components/committee/TableOfContent";
import { MDXLayout } from "components/mdx/Layout";
import gql from "graphql-tag";
import strapi from "lib/strapi";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useHydrateCommittee } from "state/committee";
import { fetchHydration, useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { Committee } from "types/strapi";

interface Props {
    mdx: MDXRemoteSerializeResult;
    committee: Committee;
    committees: Committee[];
}

const View = ({
    mdx,
    committee,
    committees,
    header,
    footer,
}: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    useHydrateCommittee(committee);
    const { t } = useTranslation("committee");

    const isAboveLg = useBreakpointValue({ base: false, lg: true });
    return (
        <Flex px={{ base: 4, md: 10 }} w="full" position="relative">
            <Sidebar
                committees={committees}
                position="sticky"
                top="80px"
                left="0"
                bottom="0"
                h="calc(100vh - 60px)"
            />
            <Flex
                flex={1}
                pl={12}
                pt={6}
                position="relative"
                direction="column"
            >
                <Heading mb={4}>{committee.name}</Heading>
                <MDXLayout source={mdx} w="full" />
            </Flex>
            {isAboveLg && (
                <TableOfContent
                    w={40}
                    position="sticky"
                    top="80px"
                    right="0"
                    bottom="0"
                    h="calc(100vh - 60px)"
                    mdxSource={committee.content as string}
                />
            )}
        </Flex>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const {
        data: { committees },
    } = await strapi.query<{ committees: Committee[] }>({
        query: gql`
            query {
                committees {
                    slug
                }
            }
        `,
    });

    return {
        paths: committees
            .filter(({ slug }) => slug !== null)
            .map(({ slug }) => ({ params: { slug: slug as string } })),
        fallback: false,
    };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data } = await strapi.query<{ committees: Committee[] }>({
        query: gql`
            query {
                committees {
                    id
                    slug
                    name
                    content
                    abbreviation
                    representatives {
                        user {
                            firstname
                            lastname
                        }
                    }
                    contacts {
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
                            contact
                        }
                    }
                    icon {
                        url
                    }
                }
            }
        `,
    });

    const committee = _.find(
        data.committees,
        (c) => c.slug === params?.slug
    ) as Committee;
    const mdxSource = await serialize(committee.content as string);

    return {
        props: {
            mdx: mdxSource,
            committee,
            committees: data.committees,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default View;
