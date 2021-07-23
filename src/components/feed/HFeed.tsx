import { Flex, HStack, StackProps } from "@chakra-ui/react";
import React, { useRef } from "react";
import { SmallCard } from "./SmallCard";
import { Event } from "../../types/strapi";
interface CategoryBadge {
    label: string;
}

interface Props {
    feed: Event[];
}

export const HFeed = (props: Props & StackProps) => {
    const { feed, ...rest } = props;
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
        <HStack
            spacing={4}
            ref={ref}
            bg="gray.100"
            p={4}
            overflowX="scroll"
            onWheel={handleScrolling}
            w="full"
            {...rest}
        >
            {feed.map((item) => (
                <SmallCard key={item.title} {...item} />
            ))}
        </HStack>
    );
};
