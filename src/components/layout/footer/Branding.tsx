import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

interface Props {
    responsiblePublisher: string;
}

export const Branding = (props: Props) => {
    return (
        <Box alignSelf={{ base: "center", lg: "flex-start" }} w="full">
            <Box maxW={{ base: "full", lg: "174px" }} pb={{ base: 8, lg: 0 }}>
                <Image
                    src="/footer-logo.svg"
                    width={174}
                    height={79}
                    alt="Logo"
                    layout="responsive"
                />
            </Box>
            <Text>
                {new Date().getFullYear()} Sektionen för Industriell Ekonomi
            </Text>
            <Flex
                pt={4}
                direction={{ base: "row", lg: "column" }}
                w="full"
                justify="space-between"
            >
                <Text>Ansvarig utgivare {props.responsiblePublisher}</Text>
                <Text>Utvecklad med 🤎 av Yonda AB & webgroup</Text>
            </Flex>
        </Box>
    );
};
