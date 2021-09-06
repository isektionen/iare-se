import { Box, BoxProps, HStack, StackProps } from "@chakra-ui/react";
import {
    motion,
    useElementScroll,
    useMotionValue,
    useSpring,
    useTransform,
    useViewportScroll,
} from "framer-motion";
import React, { useLayoutEffect, useRef, useState } from "react";

interface Props extends BoxProps {
    children: any;
}

export const HorizontalScroll = ({ children, ...props }: Props) => {
    const [scrollRange, setScrollRange] = useState(0);
    const posX = useMotionValue(0);
    //const [posX, setPosX] = useState(0);
    const [originalStyle, setStyle] = useState<string>();
    const scrollRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        scrollRef && setScrollRange(scrollRef.current?.scrollWidth ?? 0);
    }, [scrollRef]);

    const onEnter = () => {
        setStyle(window.getComputedStyle(document.body).overflowY);
        document.body.style.overflowY = "hidden";
    };

    const onLeave = () => {
        if (originalStyle) {
            document.body.style.overflowY = originalStyle;
        }
    };

    const onScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (scrollRef) {
            const newValue = posX.get() - event.deltaY;
            posX.set(Math.max(Math.min(newValue, 0), -0.8 * scrollRange));
        }
    };
    const MotionHStack = motion(HStack);
    return (
        <Box
            {...props}
            onWheel={onScroll}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <MotionHStack
                w="min-content"
                ref={scrollRef}
                spacing={1}
                style={{ x: posX }}
                transition={{
                    type: "spring",
                }}
            >
                {children}
            </MotionHStack>
        </Box>
    );
};
