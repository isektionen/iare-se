import { useRecoilSSRState, useRecoilSSRValue } from "components/RecoilSSR";
import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilCallback } from "recoil";
import {
    getTicketInfo,
    intention,
    paymentId,
    ticketState,
} from "state/checkout";
import { Allergy, Diet, Event } from "types/strapi";

import { useRouter } from "next/router";

import Script from "next/script";
import {
    Text,
    Flex,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { EventTitle } from "components/event/EventTitle";
import { EventDiscription } from "components/event/EventDiscription";
import { EventTicketList } from "components/event/EventTicketList";
import { EventTicketItem } from "components/event/EventTicketItem";
import { slugifyTicketReference } from "utils/slug";
import { Divider } from "components/Divider";
import { OptionsInput } from "components/event/OptionsInput";
import { Option } from "components/Autocomplete";
import { EventConfirmation } from "components/event/EventConfirmation";
import { IConfirmation } from "types/checkout";

interface Props {
    event: Event;
    diets: Diet[];
    allergies: Allergy[];
}
const EventView = ({ event, diets, allergies }: Props) => {
    const router = useRouter();
    const [checkout, setCheckout] = useState<any>(null);
    const [dietResult, setDietResult] = useState<Option[]>([]);
    const [specialDietResult, setSpecialDietResult] = useState<Option[]>([]);
    const [paymentInitialized, setPaymentInitialized] = useState(false);
    const [orderIsFree, setOrderIsFree] = useState(false);

    const [[currentPid, setCurrentPid], loading, error] =
        useRecoilSSRState(paymentId);
    const [currentTickets] = useRecoilSSRValue(ticketState);

    const nextQueryParams = () => {
        const query = router.asPath.split("?")[1];
        if (!query) return {};
        const pairs = query.split(/[;&]/);
        const params = pairs.reduce((params, kv) => {
            const [key, value] = kv.split("=");
            if (key && value) {
                return { ...params, [key]: value };
            }
            return { ...params };
        }, {});
        return params as any;
    };

    const checkoutRef = useRef(null);

    const breadCrumbs = ["Aktuellt", "Events"];

    const handleTicketsChecked = () => {
        if (
            currentTickets &&
            currentTickets.length > 0 &&
            event.tickets?.Tickets
        ) {
            const ticketReferences = event.tickets.Tickets.reduce(
                (previousValue, currentValue) => {
                    if (
                        currentTickets.some(
                            (reference) =>
                                reference ===
                                slugifyTicketReference(
                                    `${event.title}.${currentValue?.name}`
                                )
                        )
                    ) {
                        return [...previousValue, currentValue?.id];
                    }
                    return [...previousValue];
                },
                []
            ) as unknown as string[];
            return ticketReferences;
        }
        return [];
    };

    const handleOrderUpdate = async (ticketId: string) => {
        if (checkout) checkout.freezeCheckout();
        if (currentPid !== "-1") {
            const url = `${process.env.NEXT_PUBLIC_CHECKOUT_URL}/intent/${event.id}/${currentPid}`;
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tickets: [ticketId],
                }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.paymentId !== currentPid) {
                    setCurrentPid(data.paymentId);
                    router.push(`/event/${event.slug}?pid=${data.paymentId}`);
                }
            }
        }
        if (checkout) checkout.thawCheckout();
    };

    const handleFreeOrder = async (orderBody: IConfirmation) => {
        await handleOrderDetails();
        const url = `${process.env.NEXT_PUBLIC_CHECKOUT_URL}/intent/${currentPid}/complete`;
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderBody),
        });
    };

    const handleOrderDetails = async () => {
        if (
            dietResult.length > 0 ||
            specialDietResult.length > 0 ||
            currentPid !== "-1"
        ) {
            const url = `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/orders/${currentPid}/diets`;

            const body = {} as { diets: number[]; allergens: number[] };
            if (dietResult.length > 0)
                body["diets"] = dietResult.map((entity) =>
                    parseInt(entity.value)
                );
            if (specialDietResult.length > 0)
                body["allergens"] = specialDietResult.map((entity) =>
                    parseInt(entity.value)
                );
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
        }
    };

    const checkoutSession = useRecoilCallback(
        ({ set, snapshot }) =>
            async () => {
                const { pid } = nextQueryParams();
                if (pid === currentPid) {
                    console.log("TRUE", currentPid);
                }
                let sessionPid = pid;
                if (!pid) {
                    sessionPid = await snapshot.getPromise(intention(event.id));
                    router.push(`/event/${event.slug}?pid=${sessionPid}`);
                    const tickets = await getTicketInfo(sessionPid);
                    set(ticketState, tickets);
                } else {
                    const tickets = await getTicketInfo(currentPid as string);
                    set(ticketState, tickets);
                }

                set(paymentId, sessionPid as string);

                if (sessionPid.startsWith("free-")) {
                    setOrderIsFree(true);
                } else if (
                    Dibs &&
                    checkoutRef.current &&
                    checkoutRef.current?.childElementCount === 0
                ) {
                    setOrderIsFree(false);
                    const checkoutConfig = {
                        checkoutKey: process.env.NEXT_PUBLIC_TEST_CHECKOUT_KEY,
                        paymentId: sessionPid,
                        language: "sv-SE",
                        containerId: "checkout",
                    };
                    const _checkout = new Dibs.Checkout(checkoutConfig);
                    _checkout.on("payment-completed", (resp) =>
                        router.push(
                            `/event/${event.slug}?pid=${sessionPid}&done=true`
                        )
                    );
                    _checkout.setTheme({
                        textColor: "#000",
                        primaryColor: "#1A2123",
                        linkColor: "#357AA5",
                        backgroundColor: "#F3F5F5",
                        fontFamily: "Source Sans Pro",
                        placeholderColor: "#767676",
                        outlineColor: "#BEBEBE",
                        primaryOutlineColor: "#976E49",
                    });
                    _checkout.on("pay-initialized", (paymentId: string) => {
                        setPaymentInitialized(true);
                        _checkout.send("payment-order-finalized", true);
                    });
                    setCheckout(_checkout);
                }
            }
    );

    useEffect(() => {
        console.log(currentPid);
        checkoutSession();
    }, [currentPid]);

    useEffect(() => {
        if (paymentInitialized) {
            handleOrderDetails();
        }
    }, [paymentInitialized]);

    useEffect(() => {
        const netsCheckout = document.getElementById("nets-checkout-iframe");
        if (netsCheckout) {
            netsCheckout.style.width = "100%";
        }
    }, [checkout]);

    return (
        <Flex direction={{ base: "column", md: "row" }} justify="stretch">
            <Flex
                p={{ base: 4, md: 12 }}
                bg="gray.200"
                flex={1}
                direction="column"
            >
                <Breadcrumb pb={2}>
                    {breadCrumbs.map((b, i) => (
                        <BreadcrumbItem key={i}>
                            <BreadcrumbLink textTransform="capitalize">
                                {b}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    ))}
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink
                            textTransform="capitalize"
                            fontWeight="bold"
                        >
                            {event.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Flex direction="column">
                    <EventTitle
                        title={event.title}
                        startTime={event.startTime}
                        place={event.place}
                        badge={{ color: "green", text: "nyhet" }}
                    />
                    <EventDiscription description={event.description} />
                    {currentTickets?.length > 0 && (
                        <EventTicketList
                            tickets={event.tickets}
                            onChange={handleOrderUpdate}
                            currentTickets={handleTicketsChecked()}
                        >
                            {({ radio, ticket }) => (
                                <EventTicketItem
                                    {...radio}
                                    ticket={{ ...ticket, currency: "kr" }}
                                />
                            )}
                        </EventTicketList>
                    )}
                    <Divider />
                    <OptionsInput
                        name="Diet"
                        description="Ange den diet som passar dig bäst"
                        options={diets.map((entity) => ({
                            value: entity.id,
                            label: entity.name,
                        }))}
                        result={dietResult}
                        setResult={setDietResult}
                        placeholder="Sök efter dieter"
                        createText="Lägg till som ny"
                    />
                    <Divider />
                    <OptionsInput
                        name="Specialkost"
                        description="Ange det som passar in på dig bäst"
                        options={allergies.map((entity) => ({
                            value: entity.id,
                            label: entity.name,
                        }))}
                        result={specialDietResult}
                        setResult={setSpecialDietResult}
                        placeholder="Sök efter allergier"
                        createText="Lägg till som ny"
                    />
                </Flex>
            </Flex>
            <Box pr={{ base: 4, md: 12 }} bg="gray.50" flex={1} h="full">
                {!orderIsFree && <Box id="checkout" ref={checkoutRef} />}
                {orderIsFree && (
                    <EventConfirmation
                        title="Konfirmation"
                        firstName={{ label: "Förnamn", placeholder: "Iaren" }}
                        lastName={{
                            label: "Efternamn",
                            placeholder: "Portersson",
                        }}
                        email={{ label: "Email", placeholder: "iare@kth.se" }}
                        phoneNumber={{
                            label: "Telefon",
                            placeholder: "072-01230123",
                        }}
                        button={{ label: "Osa" }}
                        onSubmit={handleFreeOrder}
                    />
                )}
            </Box>
            <Script id="dibs-js" src={process.env.NEXT_PUBLIC_TEST_CHECKOUT} />
        </Flex>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await strapi.query<{ events: Event[] }>({
        query: gql`
            query {
                events {
                    id
                    slug
                }
            }
        `,
    });
    return {
        paths: data.events.map((e) => ({
            params: {
                slug: e.slug as string,
            },
        })),
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data } = await strapi.query<{
        event: Event;
        diets: Diet[];
        allergies: Allergy[];
    }>({
        query: gql`
            query FindEvent($slug: ID!) {
                event(id: $slug) {
                    id
                    slug
                    title
                    description
                    committee {
                        name
                    }
                    tickets {
                        Tickets {
                            id
                            name
                            price
                        }
                        allowMultiple
                    }
                    servingOptions {
                        servingFood
                    }
                    place {
                        name
                        detailedStreetInfo {
                            streetName
                            streetPostalCode
                        }
                        showMap
                    }

                    startTime
                    endTime
                    deadline
                    published_at
                }
                diets {
                    id
                    name
                }
                allergies {
                    id
                    name
                }
            }
        `,
        variables: { slug: params?.slug },
    });
    return {
        props: {
            event: data.event,
            diets: data.diets,
            allergies: data.allergies,
        },
        revalidate: 60,
    };
};

export default EventView;
