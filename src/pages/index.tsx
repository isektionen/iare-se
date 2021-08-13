import {
    Avatar,
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Spacer,
    Text,
    Image,
    VStack,
    useMediaQuery,
    useBreakpointValue,
} from "@chakra-ui/react";

import { GetStaticProps } from "next";

import React from "react";

const Home = () => {
    return <Box h="100vh">Home</Box>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    return {
        props: {},
    };
};

export default Home;
