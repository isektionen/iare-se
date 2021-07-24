import { Box, Flex, HStack, StackProps } from "@chakra-ui/react";
import React, { ReactNode, useRef } from "react";
import { SmallCard } from "./SmallCard";
import { Event } from "../../types/strapi";
import { useScrollLock } from "hooks/use-scroll-lock";
interface CategoryBadge {
    label: string;
}

interface Props<T> {
    children: (item: T, key: string) => ReactNode;
    setFeed: () => T[];
}

export const HFeed = <T extends object>(props: Props<T> & StackProps) => {
    const { setFeed, children, ...rest } = props;

    const { lock } = useScrollLock();

    const feed = setFeed();
    const ref = useRef<HTMLDivElement>(null);
    const handleScrolling = (event: React.WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (ref && ref.current) {
            const node = ref.current;
            node.scrollTo({
                left: node.scrollLeft + event.deltaY,
            });
        }
    };

    return (
        <Box
            position="relative"
            w="full"
            h="250px"
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
};
