import { Flex, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import {
    FaFacebook,
    FaLinkedinIn,
    FaInstagram,
    FaDiscord,
} from "react-icons/fa";
export const Social = () => {
    return (
        <Flex
            alignSelf={{ base: "inherit", lg: "flex-end" }}
            pt={{ base: 8, lg: 0 }}
        >
            <IconButton
                fontSize="3xl"
                variant="ghost"
                icon={<FaFacebook />}
                aria-label="Visit Facebook"
            />
            <IconButton
                fontSize="3xl"
                variant="ghost"
                icon={<FaLinkedinIn />}
                aria-label="Visit LinkedIn"
            />

            <IconButton
                fontSize="3xl"
                variant="ghost"
                icon={<FaInstagram />}
                aria-label="Visit Instagram"
            />

            <IconButton
                fontSize="3xl"
                variant="ghost"
                icon={<FaDiscord />}
                aria-label="Visit Discord"
            />
        </Flex>
    );
};
