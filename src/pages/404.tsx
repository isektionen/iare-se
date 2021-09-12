import { Box, Flex, Text } from "@chakra-ui/react";
import Error from "next/error";
import React from "react";

const Page404 = () => {
    return <Error statusCode={404} title="Page not found" />;
};

export default Page404;
