import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Spacer } from "@chakra-ui/layout";
import { motion, useCycle } from "framer-motion";
import React from "react";

export const MailPortal = () => {
    const variants = {
        open: {
            height: "70%",
            width: "40%",
            boxShadow: "var(--chakra-shadows-xl)",
        },
        closed: {
            height: "35px",
            width: "25%",
            boxShadow: "none",
        },
    };

    const { isOpen, onToggle } = useDisclosure();
    const MotionBox = motion(Box);
    return (
        <Flex
            w="100vw"
            h="100vh"
            pointerEvents="none"
            position="fixed"
            zIndex={30}
        >
            <Box position="relative" w="100vw" h="100vh" pointerEvents="none">
                <MotionBox
                    overflow="hidden"
                    pointerEvents="auto"
                    right={{ base: 4, md: 12 }}
                    bottom="0"
                    position="absolute"
                    w="25%"
                    borderTopRadius="lg"
                    height="35px"
                    transition={{ duration: 0.2 }}
                    variants={variants}
                    animate={isOpen ? "open" : "closed"}
                >
                    <Box
                        w="full"
                        bg="gray.200"
                        height="35px"
                        py={1}
                        px={2}
                        onClick={onToggle}
                    >
                        meddelande
                    </Box>
                    <Flex bg="white" h="full" w="full"></Flex>
                </MotionBox>
            </Box>
        </Flex>
    );
};
