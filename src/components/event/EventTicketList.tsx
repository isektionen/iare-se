import { Box, useRadioGroup, VStack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { ComponentEventTickets, Maybe } from "types/strapi";

interface Props {
    tickets: Maybe<ComponentEventTickets> | undefined;
    currentTickets: string[] | undefined;
    onChange: (v: string) => void;
    children: (o: any) => ReactNode;
    allowMultiple?: boolean;
}

export const EventTicketList = (props: Props) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "eventTickets",
        defaultValue: props.currentTickets ? props.currentTickets[0] : "0",
        onChange: props.onChange,
    });

    const group = getRootProps();

    return (
        <VStack {...group} w="full" pb={2}>
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
