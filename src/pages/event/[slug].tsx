import { useRecoilSSRState, useRecoilSSRValue } from "components/RecoilSSR";
import strapi, { axios, gql } from "lib/strapi";
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
import { validatePassword } from "state/checkout";
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
    chakra,
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
import {
    FieldPath,
    FieldPathValue,
    UnpackNestedValue,
    useForm,
    UseFormSetValue,
} from "react-hook-form";
import { OrderSummary } from "components/event/steps/OrderSummary";
import { BsChevronDoubleDown } from "react-icons/bs";
import _ from "underscore";
import { OrderComplete } from "components/event/steps/OrderComplete";
import { generateQRCode } from "utils/images";
import { SkeletonSpinner } from "components/SkeletonSpinner";
interface Props {
    event: Event;
    diets: Diet[];
    allergies: Allergy[];
}

export interface DefaultFieldValues {
    password: string;
    diets: Option[];
    allergens: Option[];
    ticket: string;
    orderIsFree: boolean;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    intentionId: string;
}

export type TicketData = Partial<DefaultFieldValues> & {
    qrcode: string;
    skipMessage?: boolean;
};

const EventView = ({ event, diets, allergies }: Props) => {
    const { t, lang } = useTranslation("event");
    const router = useRouter();

    const [ticketData, setTicketData] = useState<TicketData>();
    const {
        register,
        control,
        watch,
        setFocus,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isSubmitting },
        formState,
    } = useForm<DefaultFieldValues>({
        defaultValues: {
            password: "",
            diets: [],
            allergens: [],
            ticket: "",
            orderIsFree: false,
        },
    });

    const onSubmit = (data: any) => finalizeOrder(data);

    const [status, setStatus] = useState("pending");
    const {
        isLoaded,
        reset,
        hydrateCheckout,
        setCheckoutConfig,
        setTheme,
        setLanguage,
        setPaymentId,
        getPaymentId,
        withCheckout,
        initCheckout,
    } = useNets({
        on3DSHandler: (paymentId) => {
            console.log("3DS", paymentId);
        },
        onCompleteHandler: ({ paymentId }) => {
            finalizeOrder();
        },
        fullfillmentId: event.fullfillmentUID as string,
    });

    const supportedLanguages = useCallback(
        (lang) => (lang === "en" ? "en-GB" : "sv-SE"),
        []
    );

    const finalizeOrder = useCallback(
        async (order: DefaultFieldValues = getValues()) => {
            const {
                intentionId,
                orderIsFree,
                diets: _diets = [],
                allergens: _allergens = [],
            } = order;
            const diets = _diets.map((e) => ({
                id: parseInt(e.value),
                name: e.label,
            }));
            const allergens = _allergens.map((e) => ({
                id: parseInt(e.value),
                name: e.label,
            }));

            let res;
            if (orderIsFree) {
                // send customer details to strapi
                const { firstName, lastName, email, phoneNumber } = order;
                const url = `${process.env.NEXT_PUBLIC_DETA_URL}/intent/${intentionId}/complete`;
                res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        diets,
                        allergens,
                    }),
                });
            } else {
                const url = `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/orders/${intentionId}/diets`;
                const body = _.reduce(
                    [
                        {
                            label: "diets",
                            collection: _diets,
                        },
                        {
                            label: "allergens",
                            collection: _allergens,
                        },
                    ],
                    (prev, { label, collection }) => {
                        if (collection.length > 0) {
                            return {
                                ...prev,
                                [label]: collection.map((d) => ({
                                    id: parseInt(d.value),
                                    name: d.label,
                                })),
                            };
                        }
                        return prev;
                    },
                    {}
                );

                res = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });
            }
            if (res.ok) {
                produceTicket(order);
            }
        },
        []
    );

    const produceTicket = useCallback(
        async (
            order: Omit<
                DefaultFieldValues,
                "password" | "ticket" | "phoneNumber"
            > & { skipMessage?: boolean }
        ) => {
            let consumer;
            const {
                orderIsFree,
                firstName,
                lastName,
                email,
                diets,
                allergens,
                intentionId,
                skipMessage,
            } = order;
            const qrcode = await generateQRCode(intentionId);
            const { paymentId } = getPaymentId();
            if (orderIsFree) {
                consumer = {
                    firstName,
                    lastName,
                    email,
                    diets,
                    allergens,
                    qrcode,
                    intentionId,
                    skipMessage,
                };
            } else if (paymentId) {
                const url = `${process.env.NEXT_PUBLIC_DETA_URL}/intent/${paymentId}`;
                const res = await fetch(url, { method: "GET" });
                if (res.ok) {
                    const data = await res.json();

                    consumer = {
                        diets,
                        allergens,
                        firstName:
                            data.payment.consumer.privatePerson.firstName,
                        lastName: data.payment.consumer.privatePerson.lastName,
                        email: data.payment.consumer.privatePerson.email,
                        intentionId,
                        qrcode,
                        skipMessage,
                    };
                }
            } else {
                return;
            }
            setTicketData(consumer);
            setActiveStep(steps.length);
        },
        []
    );

    const isFree = useCallback(
        (currentTicket) => {
            const tickets = event?.tickets?.Tickets ?? [];
            const ticket = tickets.find((t) => t?.ticketUID === currentTicket);
            return ticket?.price === 0;
        },
        [event?.tickets?.Tickets]
    );

    const useCreateSetter = <T extends FieldPath<DefaultFieldValues>>(
        name: T,
        sideEffect?: (
            value: UnpackNestedValue<FieldPathValue<DefaultFieldValues, T>>
        ) => void
    ) => {
        return useCallback(
            (
                value: UnpackNestedValue<FieldPathValue<DefaultFieldValues, T>>
            ) => {
                setValue(name, value);
                if (sideEffect) {
                    sideEffect(value);
                }
            },
            []
        );
    };

    const useCreateGetter = <T extends FieldPath<DefaultFieldValues>>(
        name: T
    ) =>
        useMemo(() => {
            return getValues(name);
        }, [watch(name)]);

    const setTicket = useCreateSetter("ticket", (currentTicket) => {
        setValue("orderIsFree", isFree(currentTicket));
    });

    const setDiets = useCreateSetter("diets");
    const setAllergens = useCreateSetter("allergens");

    const setIntentionId = useCreateSetter("intentionId");

    const orderIsFree = useCreateGetter("orderIsFree");

    const dietResults = useCreateGetter("diets");
    const allergenResults = useCreateGetter("allergens");

    useEffect(() => {
        hydrateCheckout(async ({ get, validate, createIntention }) => {
            setStatus("pending");
            const id = get("id");
            if (id) {
                const { intentionId, paymentId, ticketId, consumer, status } =
                    await validate(id);
                if (ticketId) setTicket(ticketId);
                if (intentionId) setIntentionId(intentionId);
                if (consumer && status === "success" && intentionId) {
                    produceTicket({
                        intentionId,
                        diets: consumer.diets.map((d) => ({
                            value: `${d.id}`,
                            label: d.name,
                        })),
                        allergens: consumer.allergens.map((d) => ({
                            value: `${d.id}`,
                            label: d.name,
                        })),
                        email: consumer.email,
                        firstName: consumer.firstName,
                        lastName: consumer.lastName,
                        orderIsFree: isFree(ticketId),
                        skipMessage: true,
                    });
                } else {
                    setActiveStep(0);
                }
                setStatus("ready");
                if (status) {
                    return { intentionId, paymentId };
                }
            }
            const { intentionId, paymentId, ticketId } =
                await createIntention();
            router.replace(
                `/event/${event.slug}?id=${intentionId}`,
                undefined,
                {
                    shallow: true,
                }
            );
            if (ticketId) setTicket(ticketId);
            if (intentionId) setIntentionId(intentionId);
            setActiveStep(0);
            setStatus("ready");

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

    const handleOrder = withCheckout<string>(
        async ({ intentionId }, ticketId) => {
            setStatus("pending");

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
                setTicket(ticketId);
                const { paymentId } = await res.json();
                setPaymentId(paymentId);
                setStatus("ready");
            } else {
                setStatus("failed");
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

    const { ref: formRef, scrollTo } = useScroll<HTMLFormElement>({
        behavior: "smooth",
        block: "center",
        inline: "start",
    });

    const handlePasswordSubmit = async () => {
        const password = getValues("password");
        const isValid = await validatePassword(event.id, password);
        if (isValid) {
            setActiveStep(1);
        }
        return isValid;
    };

    const [activeStep, setActiveStep] = useState(-1);

    const steps = useMemo(() => {
        const tickets = event?.tickets?.Tickets?.length ?? 2;

        return [
            {
                label: t("step.zero"), // Password
                isVisible: event.passwordProtected !== undefined,
            },
            {
                label: t("step.one"), // Tickets
                isVisible: true,
            },
            {
                label: t("step.two"), // Diets
                isVisible: event.servingOptions?.servingFood !== undefined,
            },
            {
                label: t("step.three"), // Summary
                isVisible: true,
            },
            {
                label: t("step.four"), // Checkout
                isVisible: true,
            },
        ];
    }, [
        event.passwordProtected,
        event.servingOptions?.servingFood,
        event?.tickets?.Tickets?.length,
        t,
    ]);

    const goForward = useCallback(() => {
        if (activeStep === steps.length - 2 && !orderIsFree) {
            initCheckout();
        }
        setActiveStep(Math.max(0, Math.min(activeStep + 1, steps.length - 1)));
    }, [activeStep, initCheckout, orderIsFree, steps.length]);

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
            return activeStep >= step && (!ticketData || step === steps.length);
        },
        [activeStep, steps.length, ticketData]
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
                            {activeStep < steps.length && activeStep >= 0 && (
                                <VStepper
                                    steps={steps}
                                    activeStep={activeStep}
                                />
                            )}
                        </VStack>
                    </Box>
                )}

                <Flex
                    ref={formRef as any}
                    as="form"
                    overflow="hidden"
                    direction="column"
                    rounded="sm"
                    flex={1}
                    shadow="2xl"
                    borderWidth="1px"
                    borderColor="gray.200"
                    minH="550px"
                    bg="white"
                    w="full"
                    pos="relative"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <SkeletonSpinner
                        size="xl"
                        loadingDescription={t("fetching")}
                        isLoaded={status === "ready" || activeStep >= 0}
                        headingStyles={{ fontWeight: "light", size: "md" }}
                    >
                        {!isAboveMd && activeStep < steps.length && (
                            <Progress
                                size="xs"
                                value={(activeStep / steps.length) * 100}
                                colorScheme="brand"
                            />
                        )}
                        <Flex
                            direction="column"
                            p={6}
                            minH="650px"
                            justify="center"
                            display={
                                activeStep < steps.length ? "flex" : "none"
                            }
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
                                    flex={1}
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
                                    register={register("password", {
                                        required: "This is required",
                                    })}
                                />
                            )}
                            {formStep(1) && (
                                <Tickets
                                    control={control}
                                    display={
                                        activeStep === 1 ? "block" : "none"
                                    }
                                    label={t("step.one")}
                                    currentTickets={[getValues("ticket")]}
                                    tickets={
                                        event.tickets as ComponentEventTickets
                                    }
                                    handleOrder={handleOrder}
                                />
                            )}
                            {formStep(2) && (
                                <Options
                                    display={
                                        activeStep === 2 ? "block" : "none"
                                    }
                                    label={t("step.two")}
                                    diets={diets}
                                    allergies={allergies}
                                    dietResult={dietResults}
                                    setDietResult={setDiets}
                                    specialDietResult={allergenResults}
                                    setSpecialDietResult={setAllergens}
                                />
                            )}
                            {formStep(3) && (
                                <OrderSummary
                                    display={
                                        activeStep === 3 ? "block" : "none"
                                    }
                                    label={t("step.three")}
                                    orderLabel={t("summary.order.label")}
                                    dietLabel={t("summary.diet.label")}
                                    currentTicket={getValues("ticket")}
                                    allTickets={
                                        event.tickets
                                            ?.Tickets as ComponentEventInternalTicket[]
                                    }
                                    setTicket={handleOrder}
                                    diets={getValues("diets")}
                                    allergens={getValues("allergens")}
                                />
                            )}
                            {formStep(4) && (
                                <OrderFinalize
                                    display={
                                        activeStep === 4 ? "block" : "none"
                                    }
                                    label={t("step.four")}
                                    status={orderIsFree ? "unpaid" : "paid"}
                                    handleOrder={() => handleSubmit(onSubmit)}
                                    isSubmitting={isSubmitting}
                                    isLoaded={isLoaded}
                                    register={register}
                                    errors={errors}
                                />
                            )}

                            {(formStep(1) || !event.passwordProtected) && (
                                <>
                                    <Spacer />
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
                                            isDisabled={
                                                activeStep ===
                                                    steps.length - 1 ||
                                                status !== "ready"
                                            }
                                            onClick={goForward}
                                            isLoading={status === "pending"}
                                            ml={1}
                                            variant="iareSolid"
                                        >
                                            Next
                                        </Button>
                                    </Flex>
                                </>
                            )}
                        </Flex>
                        {formStep(5) && (
                            <OrderComplete orderData={ticketData} />
                        )}
                    </SkeletonSpinner>
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
