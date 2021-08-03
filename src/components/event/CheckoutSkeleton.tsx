import {
    Box,
    Flex,
    Skeleton,
    SkeletonText,
    Spacer,
    useBreakpointValue,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import React from "react";

interface Props {
    isLoaded: boolean;
}

export const CheckoutSkeleton = ({ isLoaded }: Props) => {
    return (
        <Flex
            left="0"
            top="0"
            right="0"
            bottom="0"
            zIndex={isLoaded ? -1 : 1}
            pos="absolute"
            p={6}
            align="center"
            justify="center"
            direction="column"
            w="full"
        >
            <Box>
                <SkeletonText noOfLines={1} mb={7} w={40} />
                <Flex
                    w="full"
                    h="full"
                    mt="20"
                    pl="2px"
                    align="center"
                    direction="row"
                >
                    <Flex flexWrap="wrap">
                        <Box>
                            <Box
                                rounded="xl"
                                minW="360"
                                borderColor="#bbb"
                                borderWidth="1px"
                                pl={12}
                                pt={7}
                                pb={5}
                            >
                                <SkeletonText
                                    noOfLines={3}
                                    mb={6}
                                    spacing={3}
                                    w={24}
                                />
                                <SkeletonText
                                    noOfLines={2}
                                    spacing={3}
                                    w={20}
                                />
                            </Box>
                        </Box>
                        <Spacer />
                        <Box>
                            <Box
                                rounded="xl"
                                minH="340"
                                minW="360"
                                borderColor="#bbb"
                                borderWidth="1px"
                                px={3}
                                py={7}
                            >
                                <SkeletonText noOfLines={1} w={20} mb={6} />
                                <Skeleton h={12} mb={8} />
                                <Skeleton h={12} ml={10} />
                            </Box>
                            <Skeleton mt={7} h={14} w="full" rounded="full" />
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};
