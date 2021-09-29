import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Icon } from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
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
import React from "react";
import { IoMdArrowDropleft } from "react-icons/io";
import { useHydrateCommittee } from "state/committee";
import { fetchHydration, useHydrater, usePageMenu } from "state/layout";
import { useSetLocaleSlug } from "state/locale";
import { LayoutProps } from "types/global";
import { Committee } from "types/strapi";
import defaultCommittee from "../../../prefetch/static/committee.json";
import committeeModel from "models/committee";
interface Props {
    mdx: MDXRemoteSerializeResult;
    committee: Committee;
    committees: Committee[];
}

const View = (props: LayoutProps<Props>) => {
    const {
        mdx,
        committees: _committees,
        committee: _committee,
        header,
        footer,
        error,
        localeSlugs,
    } = props;

    const committees = _committees
        ? _committees
        : ([defaultCommittee] as unknown as Committee[]);
    const committee = _committee
        ? _committee
        : (defaultCommittee as unknown as Committee);
    const { t } = useTranslation("common");
    useSetLocaleSlug(localeSlugs);
    useHydrater({ header, footer });
    useSanity(error);
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
            <Flex flex={1} pl={12} position="relative" direction="column">
                <AccessibleLink
                    pb={6}
                    href="/chapter/committee"
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                >
                    <Icon as={IoMdArrowDropleft} /> {t("back")}
                </AccessibleLink>
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
        fallback: "blocking",
    };
};
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const { committees, error } = await committeeModel.getCommittees(locale);

    const { committee, error: committeeError } = committeeModel.find(
        committees,
        {
            slug: params?.slug as string,
        }
    );
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
                ? `/committee/${item.slug}`
                : `/${item.locale}/committee/${item.slug}`,
    }));

    return {
        props: {
            error: error || committeeError,
            localeSlugs,
            mdx: mdxSource,
            committee,
            committees,
            ...(await fetchHydration()),
        },
        revalidate: 20,
    };
};

export default View;
