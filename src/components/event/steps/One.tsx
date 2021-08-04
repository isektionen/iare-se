import {
    Center,
    Divider,
    Fade,
    Flex,
    Heading,
    ScaleFade,
    Spinner,
} from "@chakra-ui/react";
import Box from "components/motion/Box";
import React, { useCallback, useEffect, useState } from "react";
import { ComponentEventTickets, Maybe } from "types/strapi";
import { EventTicketItem } from "../EventTicketItem";
import { EventTicketList } from "../EventTicketList";

interface Props {
    label: string;
    intendedTickets: string[];
    tickets: ComponentEventTickets;
    handleOrderUpdate: any;
}

export const One = ({
    label,
    intendedTickets,
    tickets,
    handleOrderUpdate,
}: Props) => {
    const firstTicket = intendedTickets ? intendedTickets[0] : "-1";

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        if (
            intendedTickets &&
            intendedTickets.length > 0 &&
            firstTicket !== "-1"
        ) {
            const id = setTimeout(() => setHydrated(true), 350);
            return () => clearTimeout(id);
        }
    }, [intendedTickets, firstTicket]);
    return (
        <Box key="step-one" h="full">
            <Heading size="lg" fontWeight="700">
                {label}
            </Heading>
            <Divider my={4} />
            {!hydrated && (
                <Center h="280px">
                    <Spinner size="lg" />
                </Center>
            )}
            <ScaleFade in={hydrated} unmountOnExit>
                <EventTicketList
                    tickets={tickets}
                    onChange={handleOrderUpdate}
                    currentTickets={intendedTickets}
                >
                    {({ radio, ticket }) => (
                        <EventTicketItem
                            {...radio}
                            ticket={{
                                ...ticket,
                                currency: "kr",
                            }}
                        />
                    )}
                </EventTicketList>
            </ScaleFade>
        </Box>
    );
};
