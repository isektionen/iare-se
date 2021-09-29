import {
    useBreakpointValue,
    chakra,
    Box,
    Circle,
    Divider,
    Flex,
    Heading,
    Stack,
    VStack,
    Text,
} from "@chakra-ui/react";
import React from "react";
import _ from "underscore";
import { capitalize } from "utils/text";

interface ITypography {
    family: string;
    _for: string;
    types: {
        name: string;
        weight: number | string;
    }[];
    reverse?: boolean;
    description: string;
}

const alphabet = (start: number) => {
    return _.range(start, start + 26)
        .map((i) => String.fromCharCode(i))
        .join("");
};

export const Typography = ({
    family,
    _for,
    types,
    reverse,
    description,
}: ITypography) => {
    const isAboveMd = useBreakpointValue({ base: false, md: true });
    return (
        <Stack
            w="full"
            minH="100vh"
            direction={{ base: "column", md: "row" }}
            overflow="hidden"
        >
            <VStack
                py={{ base: 2, md: 16 }}
                pr={reverse ? 0 : 8}
                pl={!reverse ? 0 : 8}
                w={{ base: "full", md: "50%" }}
                h={{ base: "50%", md: "full" }}
                align={reverse ? "flex-end" : "flex-start"}
                spacing={16}
            >
                {isAboveMd && (
                    <Circle
                        size="xs"
                        bg="brand.200"
                        fontFamily={family}
                        fontSize={80}
                    >
                        Aa
                    </Circle>
                )}
                <Heading size="lg">{capitalize(family)}</Heading>
                {isAboveMd && <Divider />}
                <Box>
                    <Text fontSize="xl">{alphabet(65)}</Text>
                    <Text fontSize="xl">{alphabet(97)}</Text>
                </Box>
                <Text fontSize="xl">{description}</Text>
            </VStack>
            <Flex
                direction="column"
                w={{ base: "full", md: "50%" }}
                bg="brand.200"
                flex={1}
                justify="space-evenly"
                align="center"
            >
                {types.map((type) => (
                    <VStack key={type.name + type.weight} spacing={1}>
                        <chakra.p
                            fontSize={72}
                            fontWeight={type.weight}
                            fontFamily={family}
                        >
                            {type.name}
                        </chakra.p>
                        <chakra.p>({type.weight})</chakra.p>
                    </VStack>
                ))}
            </Flex>
        </Stack>
    );
};
