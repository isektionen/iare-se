import {
    Box,
    HStack,
    StackProps,
    useBreakpointValue,
    VStack,
} from "@chakra-ui/react";
import React, { ReactNode, useRef } from "react";
import { Card } from "./Card";
import { isBrowser, isMobile } from "react-device-detect";
import { HFeed } from "./HFeed";
import { useScrollLock } from "hooks/use-scroll-lock";
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
    children: (item: T, key: string) => ReactNode;
    setFeed: () => T[];
}

export const Feed = <T extends { title?: string; label?: string }>(
    props: Props<T> & StackProps
) => {
    const { setFeed, children, ...rest } = props;
    const { lock } = useScrollLock();
    const feed = setFeed();
    const ref = useRef<HTMLDivElement>(null);

    const handleScrolling = (event: React.WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (ref && ref.current) {
            const node = ref.current;
            console.log(event);
            node.scrollTo({
                left: node.scrollLeft + event.deltaY,
            });
        }
    };

    const isSm = useBreakpointValue({ base: true, sm: false });

    if (isSm) {
        return (
            <Box
                h="55vh"
                w="full"
                position="relative"
                overflowX="scroll"
                onWheel={handleScrolling}
                ref={ref}
                onMouseOver={() => lock(true)}
                onMouseLeave={() => lock(false)}
            >
                <HStack
                    position="absolute"
                    spacing={4}
                    bg="gray.100"
                    p={4}
                    w="max-content"
                    h="full"
                    {...rest}
                >
                    {feed.map((item, i) => children(item, "card" + i))}
                </HStack>
            </Box>
        );
    }

    return (
        <VStack spacing={4} bg="gray.100" w="full" p={4} {...rest}>
            {feed.map((item, i) => children(item, "card-" + i))}
        </VStack>
    );
};
