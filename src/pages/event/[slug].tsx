import { useRecoilSSRState, useRecoilSSRValue } from "components/RecoilSSR";
import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilCallback } from "recoil";
import {
    intention,
    intentionState,
    paymentState,
    pidFromIntention,
    ticketsFromIntention,
    validateIntention,
    validatePassword,
} from "state/checkout";
import { Allergy, Diet, Event } from "types/strapi";
import { isBefore } from "date-fns";
import { useRouter } from "next/router";

import {
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
import { Divider } from "components/Divider";
import { OptionsInput } from "components/event/OptionsInput";
import { Option } from "components/Autocomplete";
import { EventConfirmation } from "components/event/EventConfirmation";
import { IConfirmation, IPasswordProtect, MinDiet } from "types/checkout";
import { EventMessage } from "components/event/EventMessage";
import { EventDeadline } from "components/event/EventDeadline";
import { BiCalendarExclamation } from "react-icons/bi";
import { IoWarning } from "react-icons/io5";
import { EventPasswordProtection } from "components/event/EventPasswordProtection";
import { CheckoutApi, useDibs } from "hooks/use-dibs";
import useTranslation from "next-translate/useTranslation";
import { changeLocaleData } from "utils/lang";

interface Props {
    event: Event;
    diets: Diet[];
    allergies: Allergy[];
}
const EventView = ({ event, diets, allergies, ...rest }: Props) => {
    const { t, lang } = useTranslation("event");
    const router = useRouter();

    const Dibs = useDibs();

    const [beforeDeadline] = useState(
        isBefore(new Date(), new Date(event.deadline))
    );
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [checkout, setCheckout] = useState<CheckoutApi>();
    const [dietResult, setDietResult] = useState<Option[]>([]);
    const [specialDietResult, setSpecialDietResult] = useState<Option[]>([]);
    const [paymentInitialized, setPaymentInitialized] =
        useState<boolean>(false);
    const [orderIsFree, setOrderIsFree] = useState<boolean>(false);
    const [invalidIntention, setInvalidIntention] = useState(false);

    const [paymentId] = useRecoilSSRValue(pidFromIntention);
    const [[_, setPid]] = useRecoilSSRState(paymentState);
    const [intentionId] = useRecoilSSRValue(intentionState);
    const [intendedTickets] = useRecoilSSRValue(ticketsFromIntention);

    const supportedLanguages: { [k: string]: string } = {
        en: "en-GB",
        sv: "sv-SE",
    };

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

    const checkoutRef = useRef<HTMLDivElement>(null);

    //const breadCrumbs = ["Aktuellt", "Events"];

    const handlePasswordSubmit = async ({ password }: IPasswordProtect) => {
        const isValid = await validatePassword(event.id, password);
        setIsAuthenticated(isValid);
    };

    const handleLanguageChange = () => {
        if (checkout) {
            checkout.freezeCheckout();
            checkout.setLanguage(supportedLanguages[lang]);
            checkout.thawCheckout();
        }
    };

    const handleOrderUpdate = async (ticketId: string) => {
        if (checkout) checkout.freezeCheckout();
        if (intentionId !== "-1") {
            const url = `${process.env.NEXT_PUBLIC_DETA_URL}/intent/${event.id}/${intentionId}`;
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
                setOrderIsFree(data.paymentId ? false : true);
                if (setPid) {
                    setPid(data.paymentId ? data.paymentId : "-1");
                }
            }
        }
        if (checkout) checkout.thawCheckout();
    };

    const handleFreeOrder = async (orderBody: IConfirmation) => {
        if (intentionId !== "-1") {
            const url = `${process.env.NEXT_PUBLIC_DETA_URL}/intent/${intentionId}/complete`;

            const diets = dietResult.map((entity) => parseInt(entity.value));
            const allergens = specialDietResult.map((entity) =>
                parseInt(entity.value)
            );

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...orderBody,
                    diets,
                    allergens,
                }),
            });
            router.push(`/ticket/${intentionId}`);
        }
    };

    const handleOrderDetails = async () => {
        if (
            dietResult.length > 0 ||
            specialDietResult.length > 0 ||
            intentionId !== "-1"
        ) {
            const url = `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/orders/${intentionId}/diets`;

            const body = {} as { diets: MinDiet[]; allergens: MinDiet[] };
            if (dietResult.length > 0)
                body["diets"] = dietResult.map((entity) => ({
                    id: parseInt(entity.value),
                    name: entity.label,
                }));
            if (specialDietResult.length > 0)
                body["allergens"] = specialDietResult.map((entity) => ({
                    id: parseInt(entity.value),
                    name: entity.label,
                }));
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
                const { iid } = nextQueryParams();
                if (!iid) {
                    const { intentionId, paymentId } =
                        await snapshot.getPromise(intention(event.id));
                    router.push(`/event/${event.slug}?iid=${intentionId}`);
                    set(intentionState, intentionId);

                    if (paymentId && paymentId !== "-1") {
                        set(paymentState, paymentId);
                    }
                } else {
                    const validIntention = await snapshot.getPromise(
                        validateIntention(iid)
                    );
                    if (validIntention) {
                        set(intentionState, iid);
                    } else {
                        setInvalidIntention(true);
                    }
                }
                /** When paymentId is set to "-1" it means that the
                 *  intention started with a free ticket.
                 */
                setOrderIsFree(!paymentId || paymentId === "-1" ? true : false);

                if (
                    paymentId &&
                    intentionId &&
                    paymentId !== "-1" &&
                    intentionId !== "-1" &&
                    !invalidIntention &&
                    Dibs &&
                    checkoutRef.current &&
                    checkoutRef.current?.childElementCount === 0
                ) {
                    setOrderIsFree(false);
                    const checkoutConfig = {
                        checkoutKey: process.env
                            .NEXT_PUBLIC_TEST_CHECKOUT_KEY as string,
                        paymentId: paymentId,
                        language: supportedLanguages[lang],
                        containerId: "checkout",
                    };
                    const _checkout = new Dibs.Checkout(checkoutConfig);
                    _checkout.on("payment-completed", () =>
                        router.push(`/ticket/${intentionId}`)
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
                    _checkout.on("pay-initialized", () => {
                        setPaymentInitialized(true);
                        _checkout.send("payment-order-finalized", true);
                    });
                    setCheckout(_checkout);
                }
            }
    );

    useEffect(() => {
        handleLanguageChange();
    }, [lang]);

    useEffect(() => {
        if (beforeDeadline) {
            checkoutSession();
        }
    }, [intentionId, paymentId, orderIsFree]);

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
    }, [checkout, orderIsFree]);
    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            minH="560px"
            pos="relative"
        >
            {event.passwordProtected && !isAuthenticated && (
                <EventPasswordProtection
                    onSubmit={handlePasswordSubmit}
                    placeholderText={t("passwordProtected.placeholder")}
                    showLabel={t("passwordProtected.showLabel")}
                    hideLabel={t("passwordProtected.hideLabel")}
                    submitLabel={t("passwordProtected.validateLabel")}
                />
            )}
            {(!event.passwordProtected || isAuthenticated) && (
                <>
                    <Flex
                        p={{ base: 4, md: 12 }}
                        bg="gray.100"
                        flex={1}
                        direction="column"
                    >
                        {/*<Breadcrumb pb={2}>
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
                            </Breadcrumb>*/}
                        <Flex direction="column">
                            <EventTitle
                                title={event.title}
                                startTime={event.startTime}
                                place={event.place}
                                badge={{ color: "green", text: t("badge.new") }}
                            />
                            <EventDiscription description={event.description} />
                            {intendedTickets && intendedTickets?.length > 0 && (
                                <EventTicketList
                                    tickets={event.tickets}
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
                            )}
                            <EventDeadline
                                deadline={event.deadline}
                                description={{
                                    before: t(
                                        "eventDeadlineDescription.before"
                                    ),
                                    after: t("eventDeadlineDescription.after"),
                                }}
                            />
                            {beforeDeadline &&
                                !invalidIntention &&
                                event.servingOptions?.servingFood && (
                                    <>
                                        <Divider />
                                        <OptionsInput
                                            name={t("diet.label")}
                                            description={t("diet.description")}
                                            options={diets.map((entity) => ({
                                                value: entity.id,
                                                label: entity.name,
                                            }))}
                                            result={dietResult}
                                            setResult={setDietResult}
                                            placeholder={t(
                                                "diet.search.placeholder"
                                            )}
                                            createText={t(
                                                "diet.search.createText"
                                            )}
                                        />
                                        <Divider />
                                        <OptionsInput
                                            name={t("allergen.label")}
                                            description={t(
                                                "allergen.description"
                                            )}
                                            options={allergies.map(
                                                (entity) => ({
                                                    value: entity.id,
                                                    label: entity.name,
                                                })
                                            )}
                                            result={specialDietResult}
                                            setResult={setSpecialDietResult}
                                            placeholder={t(
                                                "allergen.search.placeholder"
                                            )}
                                            createText={t(
                                                "allergen.search.createText"
                                            )}
                                        />
                                    </>
                                )}
                        </Flex>
                    </Flex>
                    <Flex
                        p={{ base: 4, md: 12 }}
                        bg="gray.50"
                        flex={1}
                        direction="column"
                    >
                        {beforeDeadline &&
                            !orderIsFree &&
                            !invalidIntention && (
                                <Box id="checkout" ref={checkoutRef} />
                            )}
                        {beforeDeadline && orderIsFree && !invalidIntention && (
                            <EventConfirmation
                                title={t("orderConfirmation.title")}
                                firstName={{
                                    label: t("orderConfirmation.firstName"),
                                    placeholder: "Iaren",
                                }}
                                lastName={{
                                    label: t("orderConfirmation.lastName"),
                                    placeholder: "Portersson",
                                }}
                                email={{
                                    label: t("orderConfirmation.email"),
                                    placeholder: "iare@kth.se",
                                }}
                                phoneNumber={{
                                    label: t("orderConfirmation.phone"),
                                    placeholder: "072-01230123",
                                }}
                                button={{
                                    label: t("orderConfirmation.button.label"),
                                }}
                                onSubmit={handleFreeOrder}
                            />
                        )}
                        {invalidIntention && (
                            <EventMessage
                                icon={IoWarning}
                                message={t("error.invalidIntention.message")}
                            />
                        )}
                        {!beforeDeadline && !invalidIntention && (
                            <EventMessage
                                icon={BiCalendarExclamation}
                                message={t("error.deadline.message")}
                            />
                        )}
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await strapi.query<{ events: Event[] }>({
        query: gql`
            query {
                events {
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

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const { data } = await strapi.query<{
        event: Event;
        diets: Diet[];
        allergies: Allergy[];
    }>({
        query: gql`
            query FindEvent($slug: ID!) {
                event(id: $slug) {
                    locale
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
                    passwordProtected {
                        __typename
                    }
                    localizations {
                        id
                        locale
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
                        passwordProtected {
                            __typename
                        }
                    }
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
            event: changeLocaleData(locale, data.event),
            diets: changeLocaleData(locale, data.diets),
            allergies: changeLocaleData(locale, data.allergies),
        },
        revalidate: 60,
    };
};

export default EventView;
