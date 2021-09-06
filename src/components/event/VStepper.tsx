import { Box, VStack, Text, BoxProps } from "@chakra-ui/react";
import React, { ReactNode, useCallback, useState } from "react";

interface Step {
    label: string;
    isVisible: boolean;
}

interface Props {
    steps: Step[];
    activeStep?: number;
    colorScheme?:
        | "whiteAlpha"
        | "blackAlpha"
        | "gray"
        | "red"
        | "orange"
        | "yellow"
        | "green"
        | "teal"
        | "blue"
        | "cyan"
        | "purple"
        | "pink"
        | "linkedin"
        | "facebook"
        | "messenger"
        | "whatsapp"
        | "twitter"
        | "telegram";
}

export const VStepper = ({
    steps,
    activeStep = 0,
    colorScheme = "gray",
    ...rest
}: Props & BoxProps) => {
    const bg = `${colorScheme}.50`;
    const activeColor = rest?.color ?? "black";
    const activeSize = "12px";
    const inactiveColor = `${colorScheme}.300`;
    const inactiveSize = "10px";
    const borderColor = `${colorScheme}.200`;
    return (
        <VStack pl={2} align="stretch" spacing={0}>
            {steps.map((s, i) => {
                const isActive = i === activeStep;
                const isLast = i === steps.length - 1;
                if (!s.isVisible) {
                    return (
                        <React.Fragment
                            key={"step-" + s.label}
                        ></React.Fragment>
                    );
                }
                return (
                    <Box
                        key={"step-" + s.label}
                        borderLeftWidth="1px"
                        borderColor={isLast ? bg : borderColor}
                        pos="relative"
                        pl="15px"
                        minH={10}
                        _before={{
                            content: '""',
                            pos: "absolute",
                            borderColor: isActive ? undefined : bg,
                            borderWidth: isActive ? undefined : "2px",
                            w: isActive ? activeSize : inactiveSize,
                            h: isActive ? activeSize : inactiveSize,
                            rounded: "full",
                            bg: isActive ? activeColor : inactiveColor,
                            ml: "-21px",
                        }}
                    >
                        <Text mt="-9px">{s.label}</Text>
                    </Box>
                );
            })}
        </VStack>
    );
};
