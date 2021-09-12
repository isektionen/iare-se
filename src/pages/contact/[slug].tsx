import {
    Avatar,
    Box,
    Button,
    Center,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
    ScaleFade,
    Spacer,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Textarea,
    useDisclosure,
    useOutsideClick,
    useToast,
    VStack,
} from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import { LinkComponent } from "components/LinkComponent";
import { useSanity } from "hooks/use-check-error";
import strapi, { gql, queryLocale } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { fetchHydration, useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { CommitteeFunction, Representative } from "types/strapi";
import defaultCommitteeFunction from "../../../prefetch/static/committeeFunction.json";
import _ from "underscore";

interface CustomRepresentative {
    name: string;
    role: string;
    email: string;
    abbr: string;
    imageSrc: string;
    personal_desc: string;
    role_desc: string;
}

const Details = (props: CustomRepresentative) => {
    return (
        <GridItem h="full">
            <Center w="full" py={8}>
                <VStack align="center" spacing={2}>
                    <Avatar name={props.name} size="xl" src={"/"} />
                    <Heading size="md">{props.name}</Heading>
                    <Text>{props.role}</Text>
                </VStack>
            </Center>
        </GridItem>
    );
};

const Description = (props: CustomRepresentative) => {
    const { t } = useTranslation("contact");
    return (
        <GridItem h="full" mt={5} w="full">
            <Tabs colorScheme="brand" isFitted>
                <TabList>
                    <Tab>
                        {t("tabs.personal.label", { person: props.name })}
                    </Tab>
                    <Tab>{t("tabs.role.label")}</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Text>
                            {props.personal_desc
                                ? props.personal_desc
                                : t("tabs.nocontent")}
                        </Text>
                    </TabPanel>
                    <TabPanel>
                        <Flex>
                            <Text>Email:</Text>
                            <Spacer />
                            <Text>{props.email}</Text>
                        </Flex>
                        <Text>
                            {props.role_desc
                                ? props.role_desc
                                : t("tabs.nocontent")}
                        </Text>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </GridItem>
    );
};

const Profile = (props: CustomRepresentative) => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref,
        handler: onClose,
    });
    return (
        <Flex
            ref={ref}
            h="full"
            position="absolute"
            w={isOpen ? "85%" : "45px"}
            top="0"
            left="0"
            transition="all 0.35s ease-in"
            zIndex={2}
        >
            <Box
                w={isOpen ? "full" : 0}
                h="full"
                pl={isOpen ? 6 : 0}
                pt={isOpen ? 6 : 0}
                pb={isOpen ? 6 : 0}
                bg="white"
                transitionDelay="0.15s"
                transition="width 0.3s linear"
            >
                <ScaleFade initialScale={0.7} in={isOpen}>
                    <Grid
                        templateRows="50% 50%"
                        h="full"
                        opacity={isOpen ? 1 : 0}
                        transition="all 1s ease-in"
                    >
                        <Details {...props} />
                        <Description {...props} />
                    </Grid>
                </ScaleFade>
            </Box>
            <VStack
                px={2}
                py={4}
                h="full"
                bg="white"
                borderRightWidth="1px"
                borderRightColor="gray.200"
            >
                {!isOpen && (
                    <Avatar
                        name={props.name}
                        size="sm"
                        src={"/"}
                        onClick={onToggle}
                        cursor="pointer"
                    />
                )}
                {isOpen && (
                    <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="close"
                        icon={<IoClose />}
                        onClick={onToggle}
                    />
                )}
            </VStack>
        </Flex>
    );
};
interface Props {
    committeeFunctions: CommitteeFunction[];
}

const RoleView = ({
    error,
    header,
    footer,
    /* @ts-ignore */
    committeeFunctions = [defaultCommitteeFunction],
}: LayoutProps<Props>) => {
    useSanity(error);
    useHydrater({ header, footer });

    const { t } = useTranslation("contact");

    const representative = _.first(
        committeeFunctions.map((rep) => {
            const _rep = _.first(
                rep.representatives as Representative[]
            ) as Representative;

            const name = _rep
                ? _rep.user?.firstname + " " + _rep.user?.lastname
                : t("vacant");
            return {
                name,
                role: rep.role,
                email: rep.contact,
                abbr: rep.abbreviation,
                imageSrc: _rep?.cover?.url ?? "",
                personal_desc: _rep?.personal_description ?? "",
                role_desc: rep.role_description,
            };
        })
    ) as CustomRepresentative;

    const {
        register,
        watch,
        getValues,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const toast = useToast();

    const continueMailToHref = useMemo(() => {
        const [to, subject, body] = getValues(["to", "subject", "body"]);
        if (subject && body) {
            return `mailto:${to}?subject=${subject}&body=${body}`;
        }
        return `mailto:${to}`;
    }, [getValues, watch()]);

    const submit = async (data: any) => {
        const { to } = data;
        const result = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (result.ok) {
            toast({
                title: t("toast.success.title"),
                description: t("toast.success.description", { to }),
                status: "success",
                duration: 6000,
                isClosable: false,
            });
            return;
        }
        toast({
            title: t("toast.error.title"),
            description: t("toast.error.description"),
            status: "error",
            duration: 6000,
            isClosable: false,
        });
    };
    return (
        <Flex
            w="full"
            justify="center"
            overflow="hidden"
            align="stretch"
            direction="column"
            pt={8}
            pb={16}
            px={{ base: 3, md: 32 }}
        >
            <AccessibleLink
                href="/contact/"
                textDecoration="none"
                mb={6}
                _hover={{ textDecoration: "none" }}
            >
                <Icon as={IoMdArrowDropleft} /> {t("back")}
            </AccessibleLink>
            <Box
                position="relative"
                overflow="hidden"
                w={{ base: "full", lg: "full" }}
                h="lg"
                bg="white"
                shadow="2xl"
                rounded="md"
                borderWidth="1px"
                borderColor="gray.200"
            >
                <Profile {...representative} />
                <Flex
                    as="form"
                    w="full"
                    h="full"
                    direction="column"
                    onSubmit={handleSubmit(submit)}
                >
                    <VStack
                        borderBottomWidth="1px"
                        borderBottomColor="gray.200"
                        p={6}
                        pl={16}
                    >
                        <FormControl
                            isInvalid={errors.to}
                            isRequired
                            isReadOnly
                        >
                            <InputGroup size="sm">
                                <InputLeftAddon w="75px">
                                    {t("mail.to.label")}
                                </InputLeftAddon>
                                <Input
                                    value={representative.email}
                                    readOnly
                                    {...register("to", { required: true })}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl isInvalid={errors.from} isRequired>
                            <InputGroup size="sm">
                                <InputLeftAddon w="75px">
                                    {t("mail.from.label")}
                                </InputLeftAddon>
                                <Input
                                    placeholder={t("mail.from.placeholder")}
                                    {...register("from", {
                                        required: t("mail.email.required"),
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: t("mail.email.invalid"),
                                        },
                                    })}
                                />
                            </InputGroup>
                            <FormErrorMessage>
                                {errors.from && errors.from.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.subject} isRequired>
                            <InputGroup size="sm">
                                <InputLeftAddon w="75px">
                                    {t("mail.subject.label")}
                                </InputLeftAddon>
                                <Input
                                    placeholder={t("mail.subject.placeholder")}
                                    {...register("subject", {
                                        required: true,
                                    })}
                                />
                            </InputGroup>
                            <FormErrorMessage>
                                {errors.subject && errors.subject.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>
                    <Flex pl={12} direction="column" flex={1}>
                        <FormControl
                            isInvalid={errors.body}
                            isRequired
                            flex={1}
                        >
                            <Textarea
                                h="full"
                                resize="none"
                                focusBorderColor="gray.200"
                                rounded="none"
                                borderWidth="0"
                                {...register("body", { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.body && errors.body.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Flex
                            p={2}
                            borderTopWidth="1px"
                            borderTopColor="gray.200"
                        >
                            <Spacer />
                            <HStack spacing={2}>
                                <LinkComponent
                                    as={Button}
                                    variant="ghost"
                                    href={continueMailToHref}
                                >
                                    {t("mail.continue")}
                                </LinkComponent>
                                <Button variant="iareSolid" type="submit">
                                    {t("mail.submit")}
                                </Button>
                            </HStack>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const {
        data: { committeeFunctions },
    } = await strapi.query<{ committeeFunctions: CommitteeFunction[] }>({
        query: gql`
            query {
                committeeFunctions(where: { slug: "skyddsombud" }) {
                    slug
                }
            }
        `,
    });

    return {
        paths: committeeFunctions.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    };
};
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const {
        data: { committeeFunctions },
        error,
    } = await queryLocale<{ committeeFunctions: CommitteeFunction[] }>`
    query  {
        committeeFunctions(locale: ${locale}, where: { slug: ${
        params?.slug as string
    } }) {
            contact
            role
            abbreviation
            role_description
            representatives {
                user {
                    firstname
                    lastname
                }
                personal_description
                cover {
                    url
                    formats
                }
            }
        }
    }
`;
    return {
        props: {
            error,
            ...(await fetchHydration()),
            committeeFunctions,
        },
    };
};

export default RoleView;
