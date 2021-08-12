import { Box, useRadioGroup, VStack } from "@chakra-ui/react";
import { DefaultFieldValues } from "pages/event/[slug]";
import React, { ReactNode, useMemo } from "react";
import {
    ControllerRenderProps,
    FieldValues,
    UseFormSetValue,
} from "react-hook-form";
import {
    ComponentEventInternalTicket,
    ComponentEventTickets,
    Maybe,
} from "types/strapi";

interface Props {
    name: string;
    field: ControllerRenderProps<DefaultFieldValues, "ticket">;
    tickets: ComponentEventTickets;
    currentTickets: string[];
    onChange: (v: string) => void;
    children: (o: any) => ReactNode;
    allowMultiple?: boolean;
}

export const EventTicketList = (props: Props) => {
    const { currentTickets } = props;
    const setDefault = useMemo(() => {
        const ticket = currentTickets?.length > 0 ? currentTickets[0] : "0";
        //setValue("ticket", ticket);
        return ticket ?? "0";
    }, [currentTickets]);

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: props.name,
        defaultValue: setDefault,
        value: props.field.value,
        onChange: (event) => {
            props.field.onChange(event);
            props.onChange(event);
        },
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
