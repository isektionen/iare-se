import { useRecoilSSRValue } from "components/RecoilSSR";
import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilCallback } from "recoil";
import { intention } from "state/checkout";
import { Event } from "types/strapi";

import { useRouter } from "next/router";

import Script from "next/script";
import {
    Flex,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Badge,
    Text,
    HStack,
    Icon,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { format } from "date-fns";
import { enGB, sv } from "date-fns/locale";
import { EventTitle } from "components/event/EventTitle";
import { EventDiscription } from "components/event/EventDiscription";
import { EventTicketList } from "components/event/EventTicketList";
import { EventTicketItem } from "components/event/EventTicketItem";

const EventView = (event: Event) => {
    const router = useRouter();
    const [checkout, setCheckout] = useState({});

    const { pid } = router.query;
    const checkoutRef = useRef(null);

    const breadCrumbs = ["Aktuellt", "Events"];

    const checkoutSession = useRecoilCallback(
        ({ set, snapshot }) =>
            async () => {
                let currentPid = pid;
                if (!pid) {
                    currentPid = await snapshot.getPromise(intention(event.id));
                    router.push(`/event/${event.slug}?pid=${currentPid}`);
                }
                if (
                    Dibs &&
                    checkoutRef.current &&
                    checkoutRef.current?.childElementCount === 0
                ) {
                    const checkoutConfig = {
                        checkoutKey: process.env.NEXT_PUBLIC_TEST_CHECKOUT_KEY,
                        paymentId: currentPid,
                        language: "sv-SE",
                        containerId: "checkout",
                    };
                    const _checkout = new Dibs.Checkout(checkoutConfig);
                    _checkout.on("payment-completed", (resp) =>
                        router.push(`/event/${event.slug}?pid=${pid}&done=true`)
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
                    setCheckout(_checkout);
                }
            }
    );

    useEffect(() => {
        checkoutSession();
    }, [checkoutSession]);

    useEffect(() => {
        const netsCheckout = document.getElementById("nets-checkout-iframe");
        if (netsCheckout) {
            netsCheckout.style.width = "100%";
        }
    }, [checkout]);

    const getDate = (dateString: string) =>
        format(new Date(dateString), "EEEE d MMM yyyy", { locale: sv });
    return (
        <Flex direction={{ base: "column", md: "row" }} justify="stretch">
            <Flex
                pl={{ base: 4, md: 12 }}
                pr={{ base: 4, md: 12 }}
                pt={{ base: 4, md: 12 }}
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
                    <EventTicketList tickets={event.tickets}>
                        {({ radio, ticket }) => (
                            <EventTicketItem
                                {...radio}
                                ticket={{ ...ticket, currency: "kr" }}
                            />
                        )}
                    </EventTicketList>
                </Flex>
            </Flex>
            <Box pr={{ base: 4, md: 12 }} bg="gray.50" flex={1} h="full">
                <Box id="checkout" ref={checkoutRef} />
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
    const { data } = await strapi.query<{ event: Event }>({
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
            }
        `,
        variables: { slug: params?.slug },
    });
    return {
        props: { ...data.event },
        revalidate: 60,
    };
};

export default EventView;
