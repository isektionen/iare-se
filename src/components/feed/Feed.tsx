import {
    Box,
    Center,
    Flex,
    Heading,
    HStack,
    Square,
    StackProps,
    useBreakpointValue,
    VStack,
    Text,
} from "@chakra-ui/react";
import React, { ReactNode, useRef } from "react";
import { Card } from "./Card";
import { isBrowser, isMobile } from "react-device-detect";
import { HFeed } from "./HFeed";
import { useScrollLock } from "hooks/use-scroll-lock";
import useTranslation from "next-translate/useTranslation";
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
    children: (item: T, key: string, priority: boolean) => ReactNode;
    setFeed: () => T[];
    _direction?: "horizontal" | "vertical" | "both";
}

export const Feed = <T,>(props: Props<T> & StackProps) => {
    const { setFeed, children, _direction = "both", ...rest } = props;
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

    const priorityAmount = 5;

    const isSm = useBreakpointValue({ base: true, sm: false });

    const { t } = useTranslation("feed");
    if (feed.length === 0) {
        return (
            <Flex justify="center" align="center" w="full" h="50vh" {...rest}>
                <Flex
                    bg="white"
                    rounded="md"
                    direction="column"
                    p={8}
                    align="center"
                >
                    <Box>
                        <Heading size="lg" textAlign="center">
                            {t("noEntriesHeader")}
                        </Heading>
                        <Text color="gray.500">{t("noEntriesBody")}</Text>
                    </Box>
                </Flex>
            </Flex>
        );
    }

    if (isSm && ["both", "horizontal"].includes(_direction)) {
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
                    {feed.map((item, i) =>
                        children(item, "card" + i, i <= priorityAmount)
                    )}
                </HStack>
            </Box>
        );
    }

    return (
        <VStack spacing={4} bg="gray.100" w="full" p={4} {...rest}>
            {feed.map((item, i) =>
                children(item, "card-" + i, i <= priorityAmount)
            )}
        </VStack>
    );
};
