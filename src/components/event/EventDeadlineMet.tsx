import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BiCalendarExclamation } from "react-icons/bi";

interface Props {
    description: string;
}
export const EventDeadlineMet = (props: Props) => {
    return (
        <Flex justify="center" align="center" h="full" w="full">
            <Flex direction="column" align="center">
                <Icon as={BiCalendarExclamation} boxSize={32} />
                <Text as="h5" fontSize={24} fontWeight={900} mb={6}>
                    {props.description}
                </Text>
            </Flex>
        </Flex>
    );
};
