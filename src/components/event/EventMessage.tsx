import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface Props {
    message: string;
    icon: IconType;
}
export const EventMessage = (props: Props) => {
    return (
        <Flex justify="center" align="center" h="full" w="full">
            <Flex direction="column" align="center">
                {props.icon && <Icon as={props.icon} boxSize={32} />}
                <Text as="h5" fontSize={24} fontWeight={900} mb={6}>
                    {props.message}
                </Text>
            </Flex>
        </Flex>
    );
};
