import { StackProps, VStack } from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";

interface CategoryBadge {
    label: string;
}

export interface FeedItem {
    imageUrl: string;
    categories: CategoryBadge[];
    title: string;
    description: string;
    author: {
        imageUrl?: string;
        name: string;
        committee: string;
    };
    createdAt: string;
}

interface Props {
    feed: FeedItem[];
}

export const Feed = (props: Props & StackProps) => {
    const { feed, ...rest } = props;
    return (
        <VStack spacing={4} bg="gray.100" {...rest} py={6} px={12}>
            {feed.map((item) => (
                <Card key={item.title} {...item} />
            ))}
        </VStack>
    );
};
