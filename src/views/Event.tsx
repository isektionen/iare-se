import { useBreakpointValue } from "@chakra-ui/media-query";
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Icon,
    IconButton,
    Progress,
    Spacer,
    Stack,
    StackDivider,
    VStack,
    Text,
    AspectRatio,
} from "@chakra-ui/react";
import { Link, Element } from "react-scroll";
import AccessibleLink from "components/AccessibleLink";
import { EventPasswordProtection } from "components/event/EventPasswordProtection";
import { Options } from "components/event/steps/Options";
import { OrderComplete } from "components/event/steps/OrderComplete";
import { OrderFinalize } from "components/event/steps/OrderFinalize";
import { OrderSummary } from "components/event/steps/OrderSummary";
import { OtherComment } from "components/event/steps/OtherComment";
import { Tickets } from "components/event/steps/Tickets";
import { VStepper } from "components/event/VStepper";
import { MDXLayout } from "components/mdx/Layout";
import { SkeletonSpinner } from "components/SkeletonSpinner";
import { format, isAfter, isBefore, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { useSanity } from "hooks/use-check-error";
import { useNets } from "hooks/use-nets";
import { Deta } from "lib/deta";
import { Strapi } from "lib/strapi";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { isMobileSafari } from "react-device-detect";
import {
    useForm,
    FieldPath,
    UnpackNestedValue,
    FieldPathValue,
} from "react-hook-form";
import { BsChevronDoubleDown } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowDropleft } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { validatePassword } from "state/checkout";
import { useHydrater } from "state/layout";
import { useSetLocaleSlug } from "state/locale";
import { LayoutProps } from "types/global";
import { Option } from "components/Autocomplete";
import { Event, UploadFile } from "types/strapi";
import _ from "underscore";
import { getDate, isBeforeDeadline } from "utils/dates";
import { generateQRCode } from "utils/images";
import defaultEvent from "../../prefetch/static/event.json";
import job from "models/job";
import { NextSeo } from "next-seo";
import { getPage, makeTitle } from "utils/seo";
import { Carousel } from "components/event/Carousel";
import { NextImage } from "components/NextImage";
import { defcast } from "utils/types";
import { Description } from "components/blog/Description";
import { Breadcrumb } from "components/Breadcrumb";
import { DeadlineCounter } from "components/DeadlineCounter";
import { BiChevronRight } from "react-icons/bi";

interface Props {
    event: Event;
    mdx: MDXRemoteSerializeResult;
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
    /* @ts-ignore */
    event = defaultEvent,
    localeSlugs,
    error,
    mdx,
}: LayoutProps<Props>) => {
    useSanity(error);
    useSetLocaleSlug(localeSlugs);
    useHydrater({ header, footer });

    const router = useRouter();
    event = defcast(event);

    const { t } = useTranslation("event");

    const seoTitle = makeTitle(
        t("seo:event.title", { event: event.title }),
        false
    );

    const path = [
        { label: "Blogg", href: "/blog" },
        { label: event.title, href: `/events/${event.slug}` },
    ];

    const RSVPable = isBeforeDeadline(defcast(event.schedule?.deadline));
    const goToRSVP = useCallback(() => {
        router.push(`/checkout/${event.slug}`);
    }, [event.slug, router]);
    return (
        <React.Fragment>
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
                                layout="fill"
                                objectFit="cover"
                                priority
                            />
                        );
                    })}
                </Carousel>
                <Description text={event.description} />
                <DeadlineCounter schedule={defcast(event.schedule)} />
                <MDXLayout source={mdx} />
                {RSVPable ? (
                    <Button variant="iareSolid" rightIcon={<BiChevronRight />}>
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
