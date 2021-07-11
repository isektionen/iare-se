import {
    Box,
    Center,
    Flex,
    HStack,
    VStack,
    Text,
    Spacer,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { Divider } from "components/Divider";
import React from "react";
import { OrderAsTicket } from "types/strapi";
import { getDate, getTime } from "utils/dates";
import { TicketInfoItem } from "./TicketInfoItem";
import Image from "next/image";

interface Props {
    ticket: OrderAsTicket;
}

const TicketContent = ({ ticket }: Props) => {
    let diets = [] as string[];
    let allergens = [] as string[];
    let tickets = [] as string[];

    if (
        ticket.consumer?.diets &&
        ticket.consumer?.allergens &&
        ticket.ticketReference
    ) {
        diets = ticket.consumer.diets.map((e) => e?.name ?? "");
        allergens = ticket.consumer.allergens.map((e) => e?.name ?? "");
        tickets = ticket.ticketReference.map((e) => e?.reference ?? "");
    }
    const date = getDate(ticket.event?.startTime);
    const time = getTime(ticket.event?.startTime);

    const isPaid = ticket.status === "success";
    return (
        <Center bg="gray.200" w="full">
            <Grid
                bg="gray.50"
                height="fit-content"
                p={8}
                m={8}
                w="full"
                gridAutoRows="fit-content"
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                }}
                gap={8}
            >
                <GridItem
                    colSpan={{ base: 1, md: 1 }}
                    rowSpan={{ base: 1, md: 0 }}
                >
                    <Center w={{ base: "full", md: "auto" }}>
                        <Image
                            src="/qr-placeholder.png"
                            width={250}
                            height={250}
                            alt="qrcode"
                        />
                    </Center>
                    <HStack mt={6} w="full" spacing={4}>
                        <TicketInfoItem
                            label="Betalt"
                            value={isPaid ? "Ja" : "Nej"}
                        />
                        <TicketInfoItem label="Biljetter" value={tickets} />
                    </HStack>
                </GridItem>
                <GridItem
                    colSpan={{ base: 1, md: 1 }}
                    rowSpan={{ base: 1, md: 0 }}
                >
                    <Box pb={6}>
                        <Text
                            as="h5"
                            fontSize={24}
                            textTransform="capitalize"
                            fontWeight="bold"
                        >
                            {ticket.event?.title}
                        </Text>
                        <Text as="h5" fontSize={10} textTransform="capitalize">
                            från {ticket.event?.committee?.name}
                        </Text>
                    </Box>
                    <VStack w="full" h="full" spacing={4}>
                        <HStack w="full">
                            <TicketInfoItem label="Datum" value={date} />
                            <TicketInfoItem label="Tid" value={time} />
                        </HStack>
                        <TicketInfoItem
                            label="Plats"
                            value={ticket.event?.place?.name ?? ""}
                        />
                        <Divider />
                        <TicketInfoItem
                            label="Namn"
                            value={`${ticket.consumer?.firstName} ${ticket.consumer?.lastName}`}
                        />
                        <HStack w="full">
                            <TicketInfoItem label="Diet" value={diets} />
                            <TicketInfoItem
                                label="Allergier"
                                value={allergens}
                            />
                        </HStack>
                        <HStack w="full">
                            <TicketInfoItem
                                label="Email"
                                value={ticket.consumer?.email ?? ""}
                            />
                            <TicketInfoItem
                                label="Telefon"
                                value={ticket.consumer?.phoneNumber ?? ""}
                            />
                        </HStack>
                    </VStack>
                </GridItem>
                <GridItem
                    rowSpan={{ base: 1, md: 1 }}
                    colSpan={{ base: 1, md: 2 }}
                    height="fit-content"
                >
                    <Center mt={4}>
                        <Text fontSize={12}>{ticket.reference ?? ""}</Text>
                    </Center>
                </GridItem>
            </Grid>
        </Center>
    );
};

export default TicketContent;
