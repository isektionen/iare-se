import { Box, BoxProps, Heading } from "@chakra-ui/react";
import React from "react";

interface ISection extends BoxProps {
    title: string;
    children: any;
}

export const Section = ({ title, children, ...props }: ISection) => {
    return (
        <Box
            as="section"
            w="full"
            minH="calc(100vh - 60px)"
            py={16}
            px={{ base: 3, md: 16 }}
            {...props}
        >
            <Heading mb={12} size="2xl">
                {title}
            </Heading>
            <Box>{children}</Box>
        </Box>
    );
};
