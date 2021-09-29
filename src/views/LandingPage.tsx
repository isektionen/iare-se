import { VStack } from "@chakra-ui/layout";
import { Gallery } from "components/blog/Gallery";
import { About } from "components/landingPage/About";
import { Hero } from "components/landingPage/Hero";
import { Sponsors } from "components/landingPage/Sponsors";
import React from "react";
import { useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { Post, Jobs, Event } from "types/strapi";

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
    useHydrater({ header, footer });

    return (
        <VStack w="full" spacing={0} align="stretch" py={8}>
            <Hero />
            <Sponsors />
            <Gallery feed={feed} py={8} span={6} />
            <About mdx={null} />
        </VStack>
    );
};

export default View;
