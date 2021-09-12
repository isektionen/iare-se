import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Sidebar } from "components/committee/Sidebar";
import { TableOfContent } from "components/committee/TableOfContent";
import { ClientError } from "components/Error";
import { MDXLayout } from "components/mdx/Layout";
import { ViewController } from "components/ViewController";
import gql from "graphql-tag";
import { useSanity } from "hooks/use-check-error";
import strapi, { extractLocales, queryLocale } from "lib/strapi";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import { useHydrateCommittee } from "state/committee";
import {
    fetchHydration,
    useAlert,
    useHydrater,
    usePageMenu,
} from "state/layout";
import { useSetLocaleSlug } from "state/locale";
import { LayoutProps } from "types/global";
import { Committee } from "types/strapi";
import defaultCommittee from "../../../prefetch/static/committee.json";

interface Props {
    mdx: MDXRemoteSerializeResult;
    committee: Committee;
    committees: Committee[];
}

const View = ({
    mdx,
    /* @ts-ignore */
    committee = defaultCommittee,
    /* @ts-ignore */
    committees = [defaultCommittee],
    header,
    footer,
    error,
    localeSlugs,
}: LayoutProps<Props>) => {
    useSetLocaleSlug(localeSlugs);
    useSanity(error);
    useHydrater({ header, footer });
    useHydrateCommittee(committee);
    usePageMenu({
        label: "Nämnder",
        viewports: ["drawer"],
        items: committees?.map((c) => ({
            label: c.name as string,
            href: "/committee/" + c?.slug ?? ("#" as string),
        })),
    });

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
                {mdx && <MDXLayout source={mdx} w="full" />}
            </Flex>
            {isAboveLg && committee?.content && (
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

export const getStaticPaths: GetStaticPaths = async (params) => {
    const {
        data: { committees },
    } = await strapi.query<{ committees: Committee[] }>({
        query: gql`
            query {
                committees(where: { slug: "styrelsen" }) {
                    slug
                }
            }
        `,
    });

    return {
        paths: committees
            .filter(({ slug }) => slug !== null)
            .map(({ slug }) => ({ params: { slug: slug as string } })),
        fallback: true,
    };
};
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const { data, error } = await queryLocale<{
        committees: Committee[];
    }>`query {
        committees(locale: ${locale}, where: {slug: ${
        params?.slug as string
    }}) {
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
            localizations {
                locale
                slug
            }
        }
    }
`;

    const committee = _.first(data.committees) as Committee;
    const mdxSource = committee?.content
        ? await serialize(committee.content as string)
        : null;

    const localeSlugs = extractLocales(
        { committee },
        ["committee"],
        ["locale", "slug"]
    ).map((item) => ({
        ...item,
        slug:
            item.locale === "sv"
                ? `/job/${item.slug}`
                : `/${item.locale}/job/${item.slug}`,
    }));

    return {
        props: {
            error,
            localeSlugs,
            mdx: mdxSource,
            committee,
            committees: data.committees,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default View;
