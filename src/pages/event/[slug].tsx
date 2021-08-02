import { useRecoilSSRState, useRecoilSSRValue } from "components/RecoilSSR";
import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useRecoilCallback } from "recoil";
import {
    forceRefetch,
    forceValue,
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
    Icon,
    Heading,
    Text,
    VStack,
    Stack,
    StackDivider,
    Button,
    Spacer,
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
import AccessibleLink from "components/AccessibleLink";
import { IoMdArrowDropleft, IoMdArrowDropleftCircle } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getDate } from "utils/dates";
import { MdDateRange } from "react-icons/md";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { VStepper } from "components/event/VStepper";
import { Two } from "components/event/steps/Two";
import { One } from "components/event/steps/One";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

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
    const [[__, setIntentedTickets]] = useRecoilSSRState(forceValue);
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
                if (setIntentedTickets) setIntentedTickets(ticketId);
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

    const steps = useMemo(
        () => [
            {
                label: t("step.one"),
                content: (
                    <One
                        label={t("step.one")}
                        intendedTickets={intendedTickets}
                        tickets={event.tickets}
                        handleOrderUpdate={handleOrderUpdate}
                    />
                ),
            },
            {
                label: t("step.two"),
                content: (
                    <Two
                        label={t("step.two")}
                        diets={diets}
                        allergies={allergies}
                        dietResult={dietResult}
                        setDietResult={setDietResult}
                        specialDietResult={specialDietResult}
                        setSpecialDietResult={setSpecialDietResult}
                    />
                ),
            },
            {
                label: t("step.three"),
                content: <Box w="full" h="100px" bg="blue"></Box>,
            },
        ],
        [t, allergies, diets, dietResult, specialDietResult]
    );

    const [activeStep, setActiveStep] = useState(0);

    const goForward = useCallback(() => {
        setActiveStep(Math.max(0, Math.min(activeStep + 1, steps.length - 1)));
    }, [setActiveStep, activeStep, steps]);

    const goBackward = useCallback(() => {
        setActiveStep(Math.max(0, Math.min(activeStep - 1, steps.length - 1)));
    }, [setActiveStep, activeStep, steps]);
    const step = useMemo(() => steps[activeStep], [steps, activeStep]);

    const MotionFlex = motion(Flex);

    if (event.passwordProtected && !isAuthenticated) {
        return (
            <EventPasswordProtection
                onSubmit={handlePasswordSubmit}
                placeholderText={t("passwordProtected.placeholder")}
                showLabel={t("passwordProtected.showLabel")}
                hideLabel={t("passwordProtected.hideLabel")}
                submitLabel={t("passwordProtected.validateLabel")}
            />
        );
    }
    return (
        <Flex
            direction="column"
            bg="white"
            pos="relative"
            px={16}
            py={10}
            height="100vh" // remove after struct
            _before={{
                content: '""',
                bg: "gray.50",
                position: "absolute",
                borderTop: "1px solid",
                borderTopColor: "gray.200",
                width: "full",
                left: 0,
                height: "full",
                top: "325px",
            }}
        >
            <Box w="full">
                <AccessibleLink
                    href="/feed/event"
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                >
                    <Icon as={IoMdArrowDropleft} /> {t("back")}
                </AccessibleLink>
                <Heading
                    my={4}
                    size="2xl"
                    textTransform="capitalize"
                    fontWeight="bold"
                >
                    {event.title}
                </Heading>
                <Text color="gray.600" my={6} noOfLines={5}>
                    {event.description}
                </Text>
            </Box>
            <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={16}
                w="full"
                zIndex="1"
            >
                <Box as="aside" w="250px" h="full">
                    <Box bg="gray.100" rounded="md" p={6} fontWeight="600">
                        {event.committee?.name}
                    </Box>
                    <VStack
                        mt={14}
                        spacing={8}
                        divider={<StackDivider borderColor="gray.200" />}
                        align="stretch"
                    >
                        <Box>
                            <Flex align="center">
                                <Icon as={FaMapMarkerAlt} mr={2} />
                                <Text
                                    textTransform="capitalize"
                                    fontWeight="600"
                                >
                                    {event?.place?.name}
                                </Text>
                            </Flex>
                            <Flex align="center">
                                <Icon as={MdDateRange} mr={2} />
                                <Text
                                    textTransform="capitalize"
                                    fontWeight="600"
                                >
                                    {getDate(
                                        event.startTime,
                                        "EEEE d MMM",
                                        lang
                                    )}
                                </Text>
                            </Flex>
                        </Box>
                        <VStepper steps={steps} activeStep={activeStep} />
                    </VStack>
                </Box>
                <MotionFlex
                    as="article"
                    bg="white"
                    rounded="sm"
                    shadow="2xl"
                    flex={1}
                    borderWidth="1px"
                    borderColor="gray.200"
                    direction="column"
                    p={6}
                >
                    {step.content}
                    <Spacer />
                    <Flex>
                        <Spacer />
                        <Button onClick={goBackward} mr={1}>
                            Back
                        </Button>
                        <Button onClick={goForward} ml={1}>
                            Next
                        </Button>
                    </Flex>
                </MotionFlex>
            </Stack>
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
