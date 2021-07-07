import { Box, RadioGroup, useRadioGroup, VStack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { ComponentEventTickets, Maybe } from "types/strapi";

interface Props {
    tickets: Maybe<ComponentEventTickets> | undefined;
    children: (o: any) => ReactNode;
}

export const EventTicketList = (props: Props) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "eventTickets",
        defaultValue: props.tickets?.Tickets[0]?.id,
        onChange: (value: string) => {
            console.log(value);
        },
    });

    const group = getRootProps();

    return (
        <VStack {...group} w="full">
            {props.tickets?.Tickets?.map((ticket, i) => {
                const radio = getRadioProps({ value: ticket?.id });
                return (
                    <Box key={i} w="full">
                        {props.children({ radio, ticket })}
                    </Box>
                );
            })}
        </VStack>
    );
};
