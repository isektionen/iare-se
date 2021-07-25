import {
    Badge,
    Box,
    Flex,
    Heading,
    HStack,
    Image,
    Spacer,
    Stack,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { Jobs } from "types/strapi";
import { imageProvider } from "utils/images";

import NextImage from "next/image";

interface Props {
    item: Jobs;
}

export const JobCard = ({ item }: Props) => {
    let bg = "white";
    if (item.company?.backgroundColor) {
        bg = { porterbrun: "brand.200", white: "white", black: "gray.900" }[
            item.company?.backgroundColor
        ];
    }

    const isAboveLg = useBreakpointValue({ base: false, lg: true });
    return (
        <Flex p={8} align="center" bg="white" w="full" rounded="md">
            {item.company?.logo ? (
                <Box
                    w="max-content"
                    h="max-content"
                    bg={bg}
                    p={2}
                    maxW={{ base: "50px", sm: "100px" }}
                    position="relative"
                >
                    <NextImage
                        src={imageProvider({ file: item.company?.logo?.url })}
                        width={item.company.logo.width as number}
                        height={item.company.logo.height as number}
                        layout="intrinsic"
                    />
                </Box>
            ) : (
                <Box maxW="100px" maxH="100px" bg="gray.200"></Box>
            )}

            <Box pl={8}>
                <Flex align="baseline">
                    <Heading size="md" noOfLines={2}>
                        {item.title}
                    </Heading>
                    {item.company?.sponsor && isAboveLg && (
                        <Badge ml={2} colorScheme="brand" variant="subtle">
                            sponsor
                        </Badge>
                    )}
                </Flex>
                <HStack
                    w="full"
                    color="gray.600"
                    divider={
                        <Box
                            as="span"
                            px={{ base: 0.5, sm: 2 }}
                            borderLeftWidth="0 !important"
                        >
                            &bull;
                        </Box>
                    }
                    textTransform="capitalize"
                >
                    {isAboveLg ? (
                        <Text>{item.company?.name}</Text>
                    ) : (
                        <Badge colorScheme="brand" variant="subtle">
                            sponsor
                        </Badge>
                    )}
                    <Text>{item.location}</Text>
                    <Text>{item.jobCategory?.name}</Text>
                </HStack>
            </Box>
        </Flex>
    );
};
