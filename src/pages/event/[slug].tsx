import { useRecoilSSRState, useRecoilSSRValue } from "components/RecoilSSR";
import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import React, {
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useRecoilCallback } from "recoil";
import {
    forceValue,
    intention,
    intentionState,
    paymentState,
    pidFromIntention,
    ticketsFromIntention,
    validateIntention,
    validatePassword,
} from "state/checkout";
import {
    Allergy,
    ComponentEventInternalTicket,
    ComponentEventTickets,
    Diet,
    Event,
} from "types/strapi";
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
    useBreakpointValue,
    Circle,
    Progress,
    Center,
    IconButton,
    createIcon,
} from "@chakra-ui/react";

import { Option } from "components/Autocomplete";
import { IConfirmation, IPasswordProtect, MinDiet } from "types/checkout";
import { EventPasswordProtection } from "components/event/EventPasswordProtection";
import { CheckoutApi, useNets } from "hooks/use-nets";
import useTranslation from "next-translate/useTranslation";
import { changeLocaleData } from "utils/lang";
import AccessibleLink from "components/AccessibleLink";
import { IoMdArrowDropleft, IoMdArrowDropleftCircle } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getDate } from "utils/dates";
import { MdDateRange } from "react-icons/md";
import { BiCheck } from "react-icons/bi";
import { VStepper } from "components/event/VStepper";
import { Options } from "components/event/steps/Options";
import { Tickets } from "components/event/steps/Tickets";
import { OrderFinalize } from "components/event/steps/OrderFinalize";
import { useScroll } from "hooks/use-scroll";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { OrderSummary } from "components/event/steps/OrderSummary";
import { BsChevronDoubleDown } from "react-icons/bs";

interface Props {
    event: Event;
    diets: Diet[];
    allergies: Allergy[];
}

export interface DefaultFieldValues {
    password: string;
    diets: Option[];
    allergens: Option[];
    orderIsFree: boolean;
    ticket: string;
}
const EventView = ({ event, diets, allergies }: Props) => {
    const { t, lang } = useTranslation("event");
    const router = useRouter();

    const {
        watch,
        register,
        control,
        setFocus,
        setError,
        setValue,
        getValues,
        handleSubmit,
    } = useForm<DefaultFieldValues>({
        defaultValues: {
            password: "",
            diets: [],
            allergens: [],
            orderIsFree: false,
            ticket: "",
        },
    });

    const onSubmit = (data: any) => console.log("onsubmit", data);

    const {
        order,
        isLoaded,
        reset,
        hydrateCheckout,
        setCheckoutConfig,
        setTheme,
        setLanguage,
        setPaymentId,
        withCheckout,
        initCheckout,
    } = useNets({
        on3DSHandler: (paymentId) => {
            console.log("3DS", paymentId);
        },
        onCompleteHandler: ({ paymentId }) => {
            console.log("Complete", paymentId);
        },
        fullfillmentId: event.fullfillmentUID as string,
    });

    const supportedLanguages = useCallback(
        (lang) => (lang === "en" ? "en-GB" : "sv-SE"),
        []
    );

    useEffect(() => {
        hydrateCheckout(async ({ get, validate, createIntention }) => {
            const iid = get("id");
            if (iid) {
                const { intentionId, paymentId } = await validate(iid);
                return { intentionId, paymentId };
            }
            const { intentionId, paymentId } = await createIntention();
            router.replace(`/event/${event.slug}?id=${intentionId}`);
            return { intentionId, paymentId };
        });

        setCheckoutConfig({
            checkoutKey: process.env.NEXT_PUBLIC_TEST_CHECKOUT_KEY as string,
            language: supportedLanguages(lang),
            containerId: "checkout",
        });

        setTheme({
            textColor: "#000",
            primaryColor: "#1A2123",
            linkColor: "#357AA5",
            backgroundColor: "#fff",
            fontFamily: "Source Sans Pro",
            placeholderColor: "#767676",
            outlineColor: "#BEBEBE",
            primaryOutlineColor: "#976E49",
        });
    }, []);

    const handleOrder = withCheckout<{ ticketId: string }>(
        async ({ intentionId, status }, ticketId) => {
            if (status === "unpaid") {
                setOrderIsFree(true);
            }
            const url = `${process.env.NEXT_PUBLIC_DETA_URL}/intent/${event.fullfillmentUID}/${intentionId}`;
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
                const { paymentId } = await res.json();
                setPaymentId(paymentId);
            }
        }
    );

    useEffect(() => {
        const handleLanguage = withCheckout(() => {
            setLanguage(supportedLanguages(lang));
        });

        handleLanguage();
    }, [lang, setLanguage, supportedLanguages]);

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
    const [deliverySuccess, setDeliverySuccess] = useState(false);

    //const [paymentId] = useRecoilSSRValue(pidFromIntention);
    //const [[_, setPid]] = useRecoilSSRState(paymentState);
    //const [intentionId] = useRecoilSSRValue(intentionState);
    //const [[__, setIntentedTickets]] = useRecoilSSRState(forceValue);
    //const [intendedTickets] = useRecoilSSRValue(ticketsFromIntention);

    const { ref: formRef, scrollTo } = useScroll<HTMLFormElement>({
        behavior: "smooth",
        block: "center",
        inline: "start",
    });

    const handlePasswordSubmit = async () => {
        const password = getValues("password");
        const isValid = await validatePassword(event.id, password);
        setIsAuthenticated(isValid);
        if (isValid) {
            setActiveStep(1);
        }
        return isValid;
    };

    /*
    

    

    
    const handleDelivery = useCallback(({ success }) => {
        if (success) {
            setDeliverySuccess(success);
        }
    }, []);

    const handleFreeOrder = useCallback(
        async (orderBody: IConfirmation) => {
            if (intentionId !== "-1") {
                const url = `${process.env.NEXT_PUBLIC_DETA_URL}/intent/${intentionId}/complete`;

                const diets = dietResult.map((entity) =>
                    parseInt(entity.value)
                );
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

                if (res.ok) {
                    handleDelivery({ success: true });
                }
            }
        },
        [intentionId, dietResult, specialDietResult, handleDelivery]
    );

    const handleOrderDetails = useCallback(async () => {
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
    }, [intentionId, dietResult, specialDietResult]);
    
    const checkoutSession = useRecoilCallback(
        ({ set, snapshot }) =>
            async () => {
                const { iid } = nextQueryParams();
                if (!iid) {
                    const { intentionId, paymentId } =
                        await snapshot.getPromise(
                            intention(event.fullfillmentUID as string)
                        );
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
                 *-/
                setOrderIsFree(!paymentId || paymentId === "-1" ? true : false);

                if (
                    paymentId &&
                    intentionId &&
                    paymentId !== "-1" &&
                    intentionId !== "-1" &&
                    !invalidIntention &&
                    Dibs &&
                    checkoutRef.current &&
                    checkoutRef.current?.childElementCount === 0 &&
                    activeStep === steps.length - 1
                ) {
                    setOrderIsFree(false);
                    const checkoutConfig = {
                        checkoutKey: process.env
                            .NEXT_PUBLIC_TEST_CHECKOUT_KEY as string,
                        paymentId: paymentId,
                        language: supportedLanguages(lang),
                        containerId: "checkout",
                    };
                    const _checkout = new Dibs.Checkout(checkoutConfig);
                    _checkout.on("payment-completed", () =>
                        handleDelivery({ success: true })
                    );
                    _checkout.setTheme({
                        textColor: "#000",
                        primaryColor: "#1A2123",
                        linkColor: "#357AA5",
                        backgroundColor: "#fff",
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
    }, [lang, handleLanguageChange]);

    useEffect(() => {
        if (paymentInitialized) {
            handleOrderDetails();
        }
    }, [paymentInitialized, handleOrderDetails]);

    const [isLoaded, setIsLoaded] = useState(false);

    const _orderIsFree = getValues("orderIsFree");
    useEffect(() => {
        const netsCheckout = document.getElementById("nets-checkout-iframe");
        if (netsCheckout) {
            netsCheckout.style.width = "100%";

            netsCheckout.addEventListener("load", () =>
                setTimeout(() => setIsLoaded(true), 2000)
            );
            return () => {
                netsCheckout.removeEventListener("load", () =>
                    setIsLoaded(false)
                );
            };
        }
    }, [checkout, _orderIsFree]);


    useEffect(() => {
        if (beforeDeadline && isAuthenticated) {
            checkoutSession();
        }
    }, [
        intentionId,
        paymentId,
        orderIsFree,
        activeStep,
        beforeDeadline,
        checkoutSession,
        isAuthenticated,
    ]);
    */
    const [activeStep, setActiveStep] = useState(0);

    const steps = useMemo(() => {
        return [
            {
                label: t("step.zero"),
                isVisible: event.passwordProtected !== undefined,
            },
            {
                label: t("step.one"),
                isVisible: true,
            } /*
            {
                label: t("step.two"),
                isVisible: event.servingOptions?.servingFood !== undefined,
            },
            {
                label: t("step.three"),
                isVisible: true,
            },*/,
            {
                label: t("step.four"),
                isVisible: true,
            },
        ];
    }, [event.passwordProtected, t]);

    const goForward = useCallback(() => {
        const ticketUID = getValues("ticket");
        const ticket = event?.tickets?.Tickets?.find(
            (t) => t?.ticketUID === ticketUID
        );
        if (ticket) {
            setValue("orderIsFree", ticket.price === 0);
            if (activeStep + 1 === steps.length - 1) {
                initCheckout();
            }
            setActiveStep(
                Math.max(0, Math.min(activeStep + 1, steps.length - 1))
            );
        } else {
            setError("ticket", {
                message: "invalid ticket",
            });
        }
    }, [
        activeStep,
        event?.tickets?.Tickets,
        getValues,
        initCheckout,
        setError,
        setValue,
        steps.length,
    ]);

    const goBackward = useCallback(() => {
        if (activeStep === steps.length - 1) {
            reset();
        }
        setActiveStep(Math.max(0, Math.min(activeStep - 1, steps.length - 1)));
    }, [activeStep, reset, steps.length]);

    const isAboveMd = useBreakpointValue({ base: false, lg: true });

    const MotionIconButton = motion(IconButton);

    const formStep = useCallback(
        (step) => {
            return activeStep >= step && !deliverySuccess;
        },
        [activeStep, deliverySuccess]
    );

    return (
        <Flex
            direction="column"
            bg="white"
            pos="relative"
            px={{ base: 3, md: 16 }}
            py={{ base: 4, md: 10 }}
            _before={{
                content: '""',
                bg: "gray.50",
                position: "absolute",
                borderTop: "1px solid",
                borderTopColor: "gray.200",
                width: "full",
                left: 0,
                height: "full",
                top: { base: "100vh", lg: "320px" },
            }}
        >
            <Flex direction="column" w="full" h={{ base: "88vh", lg: "full" }}>
                <AccessibleLink
                    href="/feed/event"
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                >
                    <Icon as={IoMdArrowDropleft} /> {t("back")}
                </AccessibleLink>
                <Flex align="center">
                    <Heading
                        my={4}
                        size="2xl"
                        textTransform="capitalize"
                        fontWeight="bold"
                    >
                        {event.title}
                    </Heading>
                    <Spacer />
                    {!isAboveMd && (
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
                    )}
                </Flex>
                <Text color="gray.600" my={6} noOfLines={5}>
                    {event.description}
                </Text>
                <Spacer />
                {!isAboveMd && (
                    <Center py={12}>
                        <MotionIconButton
                            rounded="full"
                            variant="iareSolid"
                            aria-label="go to form"
                            icon={<BsChevronDoubleDown />}
                            onClick={() => scrollTo()}
                            initial={{ y: 0 }}
                            animate={{ y: 8 }}
                            transition={{
                                repeat: Infinity,
                                duration: 0.5,
                                repeatType: "mirror",
                            }}
                        />
                    </Center>
                )}
            </Flex>
            <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={{ base: 6, md: 16 }}
                w="full"
                zIndex="1"
            >
                {!isAboveMd && (
                    <Box
                        bg="gray.100"
                        w="full"
                        rounded="md"
                        p={6}
                        fontWeight="600"
                    >
                        {event.committee?.name}
                    </Box>
                )}
                {isAboveMd && (
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
                )}
                <Flex
                    ref={formRef as any}
                    as="form"
                    bg="white"
                    rounded="sm"
                    shadow="2xl"
                    flex={1}
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor="gray.200"
                    direction="column"
                    h="calc(100vh - 125px)"
                    w="full"
                    pos="relative"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {!isAboveMd && (
                        <Progress
                            size="xs"
                            value={(activeStep / steps.length) * 100}
                            colorScheme="brand"
                        />
                    )}
                    <Flex
                        direction="column"
                        p={
                            !getValues("orderIsFree") &&
                            activeStep == steps.length - 1
                                ? "-1px"
                                : 6
                        }
                        h="full"
                    >
                        {!isAboveMd && (
                            <Flex align="center" mb={4}>
                                <Heading size="xs" fontWeight="light">
                                    {t("stepsMobile", {
                                        activeStep: activeStep + 1,
                                        totalSteps: steps.length,
                                    })}
                                </Heading>
                            </Flex>
                        )}

                        {formStep(0) && (
                            <EventPasswordProtection
                                display={activeStep === 0 ? "flex" : "none"}
                                onSubmit={handlePasswordSubmit}
                                placeholderText={t(
                                    "passwordProtected.placeholder"
                                )}
                                showLabel={t("passwordProtected.showLabel")}
                                hideLabel={t("passwordProtected.hideLabel")}
                                submitLabel={t(
                                    "passwordProtected.validateLabel"
                                )}
                                errorLabel={t("errorLabel")}
                                successLabel={t("successLabel")}
                                setFocus={setFocus}
                                register={register("password", {
                                    required: "This is required",
                                })}
                            />
                        )}
                        {formStep(1) && (
                            <Tickets
                                control={control}
                                setValue={setValue}
                                display={activeStep === 1 ? "block" : "none"}
                                label={t("step.one")}
                                currentTickets={order ? [order.id] : []}
                                tickets={event.tickets as ComponentEventTickets}
                                handleOrder={handleOrder}
                            />
                        )}
                        {/*formStep(2) && (
                            <Options
                                display={activeStep === 2 ? "block" : "none"}
                                label={t("step.two")}
                                diets={diets}
                                allergies={allergies}
                                dietResult={getValues("diets")}
                                setDietResult={(values: any) =>
                                    setValue("diets", values)
                                }
                                specialDietResult={getValues("allergens")}
                                setSpecialDietResult={(values: any) =>
                                    setValue("allergens", values)
                                }
                            />
                            )*/}
                        {/*formStep(2) && (
                            <OrderSummary
                                display={activeStep === 2 ? "block" : "none"}
                                label={t("step.three")}
                                orderLabel={t("summary.order.label")}
                                dietLabel={t("summary.diet.label")}
                                currentTicket={getValues("ticket")}
                                allTickets={
                                    event.tickets
                                        ?.Tickets as ComponentEventInternalTicket[]
                                }
                                setValue={setValue}
                                diets={getValues("diets")}
                                allergens={getValues("allergens")}
                            />
                            )*/}
                        {formStep(2) && (
                            <OrderFinalize
                                display={activeStep === 2 ? "block" : "none"}
                                label={t("step.four")}
                                status={orderIsFree ? "unpaid" : "paid"}
                                handleOrder={handleSubmit(onSubmit)}
                                invalidIntention={invalidIntention}
                                isLoaded={isLoaded}
                            />
                        )}
                        {formStep(5) && <div></div>}
                        <Spacer />
                        {(formStep(1) || !event.passwordProtected) && (
                            <Flex mt={4}>
                                <Spacer />

                                <Button
                                    onClick={goBackward}
                                    isDisabled={
                                        (event.passwordProtected &&
                                            activeStep === 1) ||
                                        activeStep === 0
                                    }
                                    mr={1}
                                    variant="iareSolid"
                                >
                                    Back
                                </Button>
                                <Button
                                    isDisabled={activeStep === steps.length - 1}
                                    onClick={goForward}
                                    ml={1}
                                    variant="iareSolid"
                                >
                                    Next
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
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
                    fullfillmentUID
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
                            swedishName
                            englishName
                            ticketUID
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
                        fullfillmentUID
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
                                swedishName
                                englishName
                                ticketUID
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
