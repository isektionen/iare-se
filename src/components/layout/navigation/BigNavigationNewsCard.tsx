import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { IoArrowRedoCircle } from "react-icons/io5";

export const BigNavigationNewsCard = () => {
    return (
        <Box borderRadius="md">
            <Box borderRadius="md" overflow="hidden" mb="-2">
                <Image
                    src="/card-placeholder-orange-purple.svg"
                    width={160}
                    height={96}
                    alt={"News placeholder image"}
                />
            </Box>
            <Text
                as="h6"
                w={40}
                px={1}
                pt={1}
                fontWeight="semibold"
                fontSize="md"
                noOfLines={2}
            >
                Kravallen söker Överall-medlemmar
            </Text>
            <Button size="xs" variant="ghost" rightIcon={<IoArrowRedoCircle />}>
                <Box as="span" fontWeight="900">
                    <b>LÄS MER</b>
                </Box>
            </Button>
        </Box>
    );
};
