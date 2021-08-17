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
import { fetchHydration, getHeader, useHydrater } from "state/layout";
import { DefHeader, LayoutProps } from "types/global";

interface Props {}

const Home = ({ header, footer }: LayoutProps<Props>) => {
    useHydrater({ header, footer });

    return <Box h="100vh">Home</Box>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    return {
        props: {
            ...(await fetchHydration()),
        },
        revalidate: 10,
    };
};

export default Home;
