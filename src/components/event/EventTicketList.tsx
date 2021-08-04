import { Box, useRadioGroup, VStack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import {
    ComponentEventInternalTicket,
    ComponentEventTickets,
    Maybe,
} from "types/strapi";

interface Props {
    tickets: ComponentEventTickets;
    currentTickets: string[];
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
                const radio = getRadioProps({
                    value: ticket?.ticketUID as string,
                });
                return (
                    <Box key={"event-ticket" + i} w="full">
                        {props.children({ radio, ticket })}
                    </Box>
                );
            })}
        </VStack>
    );
};
