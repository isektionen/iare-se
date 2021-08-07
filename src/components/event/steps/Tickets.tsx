import {
    Box,
    BoxProps,
    Center,
    Divider,
    Fade,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    ScaleFade,
    Spinner,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { DefaultFieldValues } from "pages/event/[slug]";
import React, { useCallback, useEffect, useState } from "react";
import { Control, useController, UseFormSetValue } from "react-hook-form";
import { ComponentEventTickets, Maybe } from "types/strapi";
import { EventTicketItem } from "../EventTicketItem";
import { EventTicketList } from "../EventTicketList";

interface Props extends BoxProps {
    label: string;
    intendedTickets: string[];
    tickets: ComponentEventTickets;
    handleOrderUpdate: any;
    control: Control<DefaultFieldValues>;
    setValue: UseFormSetValue<DefaultFieldValues>;
}

export const Tickets = ({
    label,
    intendedTickets,
    tickets,
    handleOrderUpdate,
    control,
    setValue,
    ...rest
}: Props) => {
    const name = "ticket";

    const { t } = useTranslation();
    const {
        field,
        formState: { errors },
    } = useController({
        control,
        name,
        rules: { required: { value: true, message: t("required") } },
    });
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
        <Box key="step-one" h="full" {...rest}>
            <Heading size="lg" fontWeight="700">
                {label}
            </Heading>
            <Divider mt={4} mb={8} />
            {!hydrated && (
                <Center>
                    <Spinner size="lg" />
                </Center>
            )}
            <ScaleFade in={hydrated} unmountOnExit>
                <FormControl isRequired isInvalid={!!errors[name]}>
                    <EventTicketList
                        name={name}
                        field={field}
                        setValue={setValue}
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
                    <FormErrorMessage>
                        {errors?.ticket && errors?.ticket?.message}
                    </FormErrorMessage>
                </FormControl>
            </ScaleFade>
        </Box>
    );
};
