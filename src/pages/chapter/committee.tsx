import { Box, Flex, Heading } from "@chakra-ui/react";
import { Sidebar } from "components/committee/Sidebar";
import { MDXLayout } from "components/mdx/Layout";
import strapi, { gql } from "lib/strapi";
import { GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { fetchHydration, useHydrater, usePageMenu } from "state/layout";
import { LayoutProps } from "types/global";
import { Committee, CommitteeLandingpage } from "types/strapi";
import _ from "underscore";

interface Props {
    committees: Committee[];
    mdx: MDXRemoteSerializeResult;
    title: string;
}

const CommitteeView = ({
    header,
    footer,
    committees,
    title,
    mdx,
}: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    usePageMenu({
        label: "Nämnder",
        viewports: ["drawer"],
        items: committees.map((c) => ({
            label: c.name as string,
            href: "/committee/" + c?.slug ?? ("#" as string),
        })),
    });
    const { t } = useTranslation("committee");
    return (
        <Flex
            py={8}
            px={{ base: 4, md: 10 }}
            w="full"
            h="100vh"
            align="stretch"
        >
            <Sidebar committees={committees} />
            <Flex pl={12} direction="column" w="full">
                <Heading mb={4}>{title}</Heading>
                <MDXLayout source={mdx} flex={1} />
            </Flex>
        </Flex>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {
        data: { committees, committeeLandingpage },
    } = await strapi.query<{
        committees: Committee[];
        committeeLandingpage: CommitteeLandingpage;
    }>({
        query: gql`
            query {
                committees {
                    id
                    slug
                    name
                    abbreviation
                    icon {
                        url
                    }
                    committee_objective {
                        objective
                    }
                }
                committeeLandingpage {
                    title
                    content
                }
            }
        `,
    });
    const mdxSource = await serialize(committeeLandingpage.content as string);

    return {
        props: {
            mdx: mdxSource,
            title: committeeLandingpage.title,
            committees /*: _.chain(committees)
                .map((committee) => {
                    const { committee_objective, ...rest } = committee;
                    if (committee_objective) {
                        const { objective } = committee_objective;
                        return { ...rest, objective };
                    }
                    return { ...rest, objective: null };
                })
                .groupBy("objective")
                .value(),*/,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default CommitteeView;
