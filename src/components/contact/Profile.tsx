import {
    Avatar,
    Box,
    Flex,
    Grid,
    IconButton,
    ScaleFade,
    useDisclosure,
    useOutsideClick,
    VStack,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { Description } from "./Description";
import { Details } from "./Detail";

interface CustomRepresentative {
    name: string;
    role: string;
    email: string;
    abbr: string;
    imageSrc: string;
    personal_desc: string;
    role_desc: string;
}

export const Profile = (props: CustomRepresentative) => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref,
        handler: onClose,
    });
    return (
        <Flex
            ref={ref}
            h="full"
            position="absolute"
            w={isOpen ? "85%" : "45px"}
            top="0"
            left="0"
            transition="all 0.35s ease-in"
            zIndex={2}
        >
            <Box
                w={isOpen ? "full" : 0}
                h="full"
                pl={isOpen ? 6 : 0}
                pt={isOpen ? 6 : 0}
                pb={isOpen ? 6 : 0}
                bg="white"
                transitionDelay="0.15s"
                transition="width 0.3s linear"
            >
                <ScaleFade initialScale={0.7} in={isOpen}>
                    <Grid
                        templateRows="50% 50%"
                        h="full"
                        opacity={isOpen ? 1 : 0}
                        transition="all 1s ease-in"
                    >
                        <Details {...props} />
                        <Description {...props} />
                    </Grid>
                </ScaleFade>
            </Box>
            <VStack
                px={2}
                py={4}
                h="full"
                bg="white"
                borderRightWidth="1px"
                borderRightColor="gray.200"
            >
                {!isOpen && (
                    <Avatar
                        name={props.name}
                        size="sm"
                        src={"/"}
                        onClick={onToggle}
                        cursor="pointer"
                    />
                )}
                {isOpen && (
                    <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="close"
                        icon={<IoClose />}
                        onClick={onToggle}
                    />
                )}
            </VStack>
        </Flex>
    );
};
