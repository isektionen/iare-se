import { Circle, Icon, VStack, HStack, Text, Flex } from "@chakra-ui/react";
import AccessibleLinkOverlay from "components/AccessibleLinkOverlay";
import React from "react";
import { FaGavel } from "react-icons/fa";
import { ListItemProp, MenuListItem } from "types/global";
import { ComponentHeaderSubSection } from "types/strapi";

export const BigNavigationMenuCard = (props: ComponentHeaderSubSection) => {
    return (
        <Flex
            borderRadius={"md"}
            py={2}
            px={4}
            minW={36}
            minH={24}
            direction="row"
        >
            <Circle w={10} h={10} mr={4} bg={"#C4C4C4"}>
                <Icon as={FaGavel} />
            </Circle>
            <VStack spacing={0.5}>
                <Text as="h6" fontSize="lg" w="full" fontWeight="semibold">
                    {props.label}
                </Text>
                {props.description && (
                    <Text fontSize="sm" w="full" color="#4D4D4D">
                        {props.description}
                    </Text>
                )}
            </VStack>
        </Flex>
    );
};
