import { Flex } from "@chakra-ui/react";
import { Sidebar } from "components/sidebar/Sidebar";
import React from "react";

const Home = () => {
    return (
        <Flex>
            <Sidebar />
            <Flex></Flex>
        </Flex>
    );
};
export default Home;
