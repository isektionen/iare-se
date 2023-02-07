import { VStack } from "@chakra-ui/layout";
import { Gallery } from "components/blog/Gallery";
import { About } from "components/landingPage/About";
import { Hero } from "components/landingPage/Hero";
import { Calender } from "components/landingPage/Calender";
import { StudentLifeDisplay } from "components/landingPage/StudentLifeDisplay";
import { Sponsors } from "components/landingPage/Sponsors";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { Post, Jobs, Event } from "types/strapi";
import _ from "underscore";
import { makeTitle } from "utils/seo";

export type Feed = ((Omit<Post, "categories"> | Event | Jobs) & {
    author: string;
    __body: string;
    __calendarDate: string;
    __href: string;
    categories: string[];
})[];

interface Props {
    feed: Feed;
}

const View = ({ header, footer, feed }: LayoutProps<Props>) => {
    const { t } = useTranslation();
    useHydrater({ header, footer });

    return (
        <React.Fragment>
            <NextSeo title={makeTitle(t("seo:landing-page.title"))} />
            <VStack w="full" spacing="false" align="stretch" py={0}>
                <Hero />
                <Calender />
                <StudentLifeDisplay />
                <Gallery feed={feed} py={8} span={6} />
                <Sponsors />
                <About mdx={null} />
            </VStack>
        </React.Fragment>
    );
};

export default View;
