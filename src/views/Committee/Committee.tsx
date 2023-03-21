import { Flex, Heading } from "@chakra-ui/react";
import { Sidebar } from "components/committee/Sidebar";
import { MDXLayout } from "components/mdx/Layout";
import { useSanity } from "hooks/use-check-error";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useHydrater, usePageMenu } from "state/layout";
import { LayoutProps } from "types/global";
import { Committee } from "types/strapi";
import { makeTitle } from "utils/seo";

interface Props {
    committees: Committee[];
    mdx: MDXRemoteSerializeResult;
    title: string;
}

const View = ({
    header,
    footer,
    committees,
    title,
    mdx,
    error,
}: LayoutProps<Props>) => {
    const { t } = useTranslation();
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

    const menuPage = t("seo:committee.title") !== "seo:committee.title";
    const translationString = menuPage
        ? "seo:committee.title"
        : "seo:committees.title";

    return (
        <React.Fragment>
            <NextSeo title={makeTitle(t(translationString))} />
            <Flex py={8} px={{ base: 4, md: 10 }} w="full" align="stretch">
                <Sidebar committees={committees} />
                <Flex
                    pl={{ base: "0px", md: "12px" }}
                    direction="column"
                    w="full"
                >
                    <Heading mb={4}>{title}</Heading>
                    {mdx && <MDXLayout source={mdx} flex={1} />}
                </Flex>
            </Flex>
        </React.Fragment>
    );
};

export default View;
