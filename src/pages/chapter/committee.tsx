import { Box, Flex, Heading } from "@chakra-ui/react";
import { Sidebar } from "components/committee/Sidebar";
import { MDXLayout } from "components/mdx/Layout";
import strapi, { gql, queryLocale } from "lib/strapi";
import { GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import {
    fetchHydration,
    useAlert,
    useHydrater,
    usePageMenu,
} from "state/layout";
import { LayoutProps } from "types/global";
import { Committee, CommitteeLandingpage } from "types/strapi";
import _, { any } from "underscore";
import { checkForError } from "utils/error";
import Error from "next/error";
import { ClientError } from "components/Error";
import { useSanity } from "hooks/use-check-error";
import committee from "models/committee";
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
    error,
}: LayoutProps<Props>) => {
    useSanity(error);
    useHydrater({ header, footer });
    usePageMenu({
        label: "Nämnder",
        viewports: ["drawer"],
        items: committees.map((c) => ({
            label: c.name as string,
            href: "/committee/" + c?.slug ?? ("#" as string),
        })),
    });

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
                {mdx && <MDXLayout source={mdx} flex={1} />}
            </Flex>
        </Flex>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const { committeeLandingpage } = await committee.getLandingPage(locale);
    const { committees, error } = await committee.getCommittees(locale);
    const mdxSource = committeeLandingpage?.content
        ? await serialize(committeeLandingpage.content)
        : null;

    return {
        props: {
            error,
            mdx: mdxSource,
            title: committeeLandingpage?.title ?? null,
            committees,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default CommitteeView;
