import { useBreakpointValue } from "@chakra-ui/media-query";
import {
    Button,
    IconButton,
    VStack,
    Text,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
} from "@chakra-ui/react";
import { MDXLayout } from "components/mdx/Layout";
import { format } from "date-fns";
import { useSanity } from "hooks/use-check-error";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useState, useCallback, KeyboardEvent, useEffect } from "react";

import { useHydrater } from "state/layout";
import { useSetLocaleSlug } from "state/locale";
import { LayoutProps } from "types/global";
import { Option } from "components/Autocomplete";
import { Event, UploadFile } from "types/strapi";
import _ from "underscore";
import { isBeforeDeadline } from "utils/dates";
import { NextSeo } from "next-seo";
import { getPage, makeTitle } from "utils/seo";
import { Carousel } from "components/event/Carousel";
import { NextImage } from "components/NextImage";
import { defcast } from "utils/types";
import { Description } from "components/blog/Description";
import { Breadcrumb } from "components/Breadcrumb";
import { DeadlineCounter } from "components/DeadlineCounter";
import { BiChevronRight, BiHide, BiShow } from "react-icons/bi";

interface Props {
    _event: Event;
    mdx: MDXRemoteSerializeResult;
    requiresPassword: boolean;
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
    otherCommentResponse: string;
}

export type TicketData = Partial<DefaultFieldValues> & {
    qrcode: string;
    skipMessage?: boolean;
};

const View = ({
    header,
    footer,
    _event,
    localeSlugs,
    error,
    mdx,
    requiresPassword,
}: LayoutProps<Props>) => {
    useSanity(error);
    useSetLocaleSlug(localeSlugs);
    useHydrater({ header, footer });

    const [password, setPassword] = useState<string>();
    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const router = useRouter();
    const event = _event; //defcast(_event);

    const { t } = useTranslation("event");

    const seoTitle = makeTitle(
        t("seo:event.title", { event: event.title }),
        false
    );

    const path = [
        { label: "Aktuellt", href: "/blog" },
        { label: event.title, href: `/event/${event.slug}` },
    ];

    const Rsvpable = isBeforeDeadline(defcast(event.schedule?.deadline));

    const rsvp = useCallback(() => {
        setLoading(true);
        if (requiresPassword) {
            return router.push(
                `/event/${event.slug}/checkout?password=${password}`
            );
        }
        router.push(`/event/${event.slug}/checkout`);
    }, [event.slug, password, requiresPassword, router]);

    const goToRsvp = useCallback(() => {
        if (requiresPassword) {
            onOpen();
        } else {
            rsvp();
        }
    }, [onOpen, requiresPassword, rsvp]);

    const handleOnEnter = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                rsvp();
            }
        },
        [rsvp]
    );

    const toaster = useToast();
    const isMd = useBreakpointValue({ base: false, md: true });

    useEffect(() => {
        const { callback } = router.query as { callback: string };
        if (callback) {
            setLoading(false);
            switch (callback) {
                case "invalid.password":
                    toaster({
                        title: t("modal.callback.invalid-password"),
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                    break;
                case "due.date":
                    toaster({
                        title: t("modal.callback.due-date"),
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                    });
                    break;
                case "no.products":
                    toaster({
                        title: t("modal.callback.no-products"),
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                    break;
            }

            router.replace(`/event/${event.slug}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query]);

    const ImageLayout: "intrinsic" | "fill" | undefined = useBreakpointValue({
        base: "intrinsic",
        md: "fill",
    });
    return (
        <React.Fragment>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t("modal.title")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <InputGroup size="md">
                            <Input
                                onKeyDown={handleOnEnter}
                                autoFocus
                                onChange={(e) => setPassword(e.target.value)}
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder={t("modal.placeholder")}
                            />
                            <InputRightElement width="4.5rem">
                                <IconButton
                                    variant="ghost"
                                    aria-label={show ? "hide" : "show"}
                                    icon={!show ? <BiShow /> : <BiHide />}
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => setShow((s) => !s)}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="iareSolid"
                            mr={3}
                            onClick={rsvp}
                            isLoading={loading}
                        >
                            {t("modal.primary")}
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            {t("modal.secondary")}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <NextSeo
                title={seoTitle}
                openGraph={{
                    type: "website",
                    url: getPage(("event/" + event.slug) as string),
                    title: seoTitle,
                    description: event?.description ?? "",
                    images: [
                        {
                            url:
                                _.first(event.media || ([] as UploadFile[]))
                                    ?.formats.thumbnail.url ?? "",
                            width:
                                _.first(event.media || ([] as UploadFile[]))
                                    ?.formats.thumbnail.width ?? 0,
                            height:
                                _.first(event.media || ([] as UploadFile[]))
                                    ?.formats.thumbnail.height ?? 0,
                            alt: `Hero image for ${event.title}`,
                        },
                    ],
                }}
            />
            <VStack
                overflow="hidden"
                bg="white"
                pos="relative"
                align="start"
                spacing={8}
                px={{ base: 3, md: 16 }}
                pt={{ base: 4, md: 10 }}
                pb={{ base: 8, md: 16 }}
            >
                <Breadcrumb path={path} />
                <Carousel
                    title={event.title}
                    description={`${format(
                        new Date(defcast(event.schedule).start),
                        "dd MMMM yyyy"
                    )} • ${event.location}`}
                >
                    {defcast(event.media).map((image, i) => {
                        image = defcast(image);
                        return (
                            <NextImage
                                key={i}
                                w="full"
                                src={image.url}
                                width={image.width || 0}
                                height={image.height || 0}
                                layout={ImageLayout}
                                objectFit="cover"
                                priority
                            />
                        );
                    })}
                </Carousel>
                <Description text={event.description} />
                <DeadlineCounter schedule={defcast(event.schedule)} />
                <MDXLayout source={mdx} />
                {Rsvpable ? (
                    <Button
                        isFullWidth={!isMd}
                        variant="iareSolid"
                        rightIcon={<BiChevronRight />}
                        onClick={goToRsvp}
                    >
                        {t("rsvp")}
                    </Button>
                ) : (
                    <Text>{t("error.deadline.message")}</Text>
                )}
            </VStack>
        </React.Fragment>
    );
};

export default View;
