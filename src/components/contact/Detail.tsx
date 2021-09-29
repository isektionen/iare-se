import {
    GridItem,
    Center,
    VStack,
    Avatar,
    Heading,
    Text,
} from "@chakra-ui/react";
import React from "react";

interface CustomRepresentative {
    name: string;
    role: string;
    email: string;
    abbr: string;
    imageSrc: string;
    personal_desc: string;
    role_desc: string;
}

export const Details = (props: CustomRepresentative) => {
    return (
        <GridItem h="full">
            <Center w="full" py={8}>
                <VStack align="center" spacing={2}>
                    <Avatar name={props.name} size="xl" src={"/"} />
                    <Heading size="md">{props.name}</Heading>
                    <Text>{props.role}</Text>
                </VStack>
            </Center>
        </GridItem>
    );
};
