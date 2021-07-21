import { Flex, VStack } from "@chakra-ui/react";
import React from "react";
import { GrWorkshop } from "react-icons/gr";
import { HiHome } from "react-icons/hi";
import { MdEvent } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
import { Categories } from "./Categories";
import { Pages } from "./Pages";

export const Sidebar = () => {
    return (
        <VStack spacing={6} h="full" w="25%" py={4} px={12}>
            <Pages
                w="full"
                routes={[
                    { label: "Händelser", icon: HiHome, href: "/" },
                    { label: "Event", icon: MdEvent, href: "/event" },
                    { label: "Jobb", icon: RiUserSearchFill, href: "/jobb" },
                ]}
            />
            <Categories
                w="full"
                items={[
                    {
                        label: "Studier",
                        query: "?=studier",
                    },
                    {
                        label: "Pubbar",
                        query: "?=pubbar",
                    },
                    {
                        label: "Utbyte",
                        query: "?=utbyte",
                    },
                ]}
            />
        </VStack>
    );
};
