import { Flex, Heading } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Icon } from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import { Sidebar } from "components/committee/Sidebar";
import { TableOfContent } from "components/committee/TableOfContent";
import { MDXLayout } from "components/mdx/Layout";
import { useSanity } from "hooks/use-check-error";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { IoMdArrowDropleft } from "react-icons/io";
import { useHydrateCommittee } from "state/committee";
import { useHydrater, usePageMenu } from "state/layout";
import { useSetLocaleSlug } from "state/locale";
import { LayoutProps } from "types/global";
import { Committee } from "types/strapi";
import { makeTitle } from "utils/seo";
import defaultCommittee from "../../../prefetch/static/committee.json";

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
        <React.Fragment>
            <NextSeo
                title={makeTitle(
                    t("seo:committee-single.title", {
                        committee: committee.name,
                    }),
                    false
                )}
            />

            <Flex py={8} px={{ base: 4, md: 10 }} w="full" align="stretch">
                <Sidebar
                    committees={committees}
                    // position="sticky"
                    top="80px"
                    left="0"
                    bottom="0"
                    // h="calc(100vh - 60px)"
                />
                <Flex
                    w={{ base: "60%" }}
                    flex={1}
                    pl={{ base: "0px", md: "12px" }}
                    position="relative"
                    direction="column"
                >
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
        </React.Fragment>
    );
};

export default View;
