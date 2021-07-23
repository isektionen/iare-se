import { StackProps, VStack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Card } from "./Card";

interface CategoryBadge {
    label: string;
}

export interface FeedItem {
    imageUrl?: string;
    categories: CategoryBadge[];
    title: string;
    description?: string;
    slug?: string;
    author?: {
        imageUrl?: string;
        name: string;
        committee: string;
    };
    createdAt: string;
}

interface Props<T> {
    children: (item: T) => ReactNode;
    setFeed: () => T[];
}

export const Feed = <T extends { title?: string; label?: string }>(
    props: Props<T> & StackProps
) => {
    const { setFeed, ...rest } = props;

    const feed = setFeed();
    return (
        <VStack spacing={4} bg="gray.100" w="full" p={4} {...rest}>
            {feed.map((item) => props.children(item))}
        </VStack>
    );
};
