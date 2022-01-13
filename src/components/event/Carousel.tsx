import {
    Box,
    BoxProps,
    Center,
    Flex,
    Heading,
    HStack,
    Spacer,
    Text,
} from "@chakra-ui/react";
import React, { ReactChild, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import _ from "underscore";

interface Props extends BoxProps {
    title: string;
    description: string;
    children: ReactChild[];
}

export const Carousel = ({ children, title, description, ...props }: Props) => {
    const autoplay = Autoplay({ delay: 6500, stopOnMouseEnter: true });

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            loop: true,
            skipSnaps: false,
        },
        [autoplay]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnap, setScrollSnap] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (emblaApi) {
            // Embla API is ready
            setScrollSnap(emblaApi.scrollSnapList());
            onSelect();
            emblaApi.on("select", onSelect);
            return () => {
                emblaApi.off("select", onSelect);
            };
        }
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (i: number) => {
            if (emblaApi) {
                emblaApi.scrollTo(i);
            }
        },
        [emblaApi]
    );

    return (
        <Box
            overflow="hidden"
            borderRadius="lg"
            shadow="dark-lg"
            w="full"
            position="relative"
            {...props}
        >
            <Box
                h="full"
                w="full"
                pos="absolute"
                zIndex={1}
                pointerEvents="none"
            >
                <Flex
                    p={8}
                    direction="column"
                    bg="rgba(125, 90, 60, 0.35)"
                    h="full"
                    w="full"
                >
                    <Spacer />
                    <Box>
                        <Heading
                            fontSize="5xl"
                            color="white"
                            textTransform="capitalize"
                            fontWeight="bold"
                            fontFamily="source sans pro"
                        >
                            {title}
                        </Heading>
                        <Text color="white" fontFamily="source sans pro">
                            {description}
                        </Text>
                    </Box>
                    <HStack
                        w="full"
                        justifyContent="center"
                        pointerEvents="auto"
                    >
                        {scrollSnap.length > 1 &&
                            scrollSnap.map((snap, i) => (
                                <Box
                                    key={i}
                                    w="18px"
                                    borderRadius="full"
                                    borderWidth="2px"
                                    borderColor={
                                        i === selectedIndex
                                            ? "white"
                                            : "rgba(255,255,255,0.4)"
                                    }
                                    cursor="pointer"
                                    onClick={() => scrollTo(i)}
                                />
                            ))}
                    </HStack>
                </Flex>
            </Box>
            <Box ref={emblaRef} w="full">
                <HStack spacing={0}>
                    {children.map((child, i) => (
                        <Box
                            key={i}
                            position="relative"
                            w="full"
                            h="xl"
                            flex="0 0 auto"
                        >
                            {child}
                        </Box>
                    ))}
                </HStack>
            </Box>
        </Box>
    );
};
