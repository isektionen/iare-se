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
import AccessibleLink from "components/AccessibleLink";
import AccessibleLinkOverlay from "components/AccessibleLinkOverlay";
import { Card } from "components/feed/Card";
import { Feed } from "components/feed/Feed";
import { MobileCard } from "components/feed/MobileCard";
import { RouteItem } from "components/sidebar/Pages";
import { Sidebar } from "components/sidebar/Sidebar";
import strapi, { gql } from "lib/strapi";
import { GetStaticProps } from "next";
import router from "next/router";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { IoShareSocial } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
import { Post, Category } from "types/strapi";
import { getDate, getTimeLeft } from "utils/dates";
import { imageSource } from "utils/images";
import { estimateReadingMinutes } from "utils/text";

const Home = () => {
    return <div>home</div>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    return {
        props: {},
    };
};

export default Home;
