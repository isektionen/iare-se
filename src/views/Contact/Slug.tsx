import {
    Button,
    Box,
    Flex,
    FormControl,
    FormErrorMessage,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftAddon,
    Spacer,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import AccessibleLink from "components/AccessibleLink";
import { Profile } from "components/contact/Profile";
import { LinkComponent } from "components/LinkComponent";
import { useSanity } from "hooks/use-check-error";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowDropleft } from "react-icons/io";
import { useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { CommitteeFunction, Representative } from "types/strapi";
import _ from "underscore";
import { makeTitle } from "utils/seo";
import defaultCommitteeFunction from "../../../prefetch/static/committeeFunction.json";

interface CustomRepresentative {
    name: string;
    role: string;
    email: string;
    abbr: string;
    imageSrc: string;
    personal_desc: string;
    role_desc: string;
}

interface Props {
    representative: CommitteeFunction[];
}

const View = ({
    error,
    header,
    footer,
    /* @ts-ignore */
    representative = [defaultCommitteeFunction],
}: LayoutProps<Props>) => {
    useSanity(error);
    useHydrater({ header, footer });

    const { t } = useTranslation("contact");

    const repr = _.first(
        representative.map((rep) => {
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
        <React.Fragment>
            <NextSeo
                title={makeTitle(
                    t("seo:contact-single.title", { contact: repr.role })
                )}
            />

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
                    <Profile {...repr} />
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
                                        value={repr.email}
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
                                                message:
                                                    t("mail.email.invalid"),
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
                                        placeholder={t(
                                            "mail.subject.placeholder"
                                        )}
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
        </React.Fragment>
    );
};

export default View;
