import strapi, { extractLocales, gql, queryLocale } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { Company, Jobs, UploadFile } from "types/strapi";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import { MDXLayout } from "components/mdx/Layout";
import { LayoutWrapper } from "components/layout/LayoutWrapper";
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    Icon,
    Spacer,
    Stack,
    StackDivider,
    Text,
    useBreakpointValue,
    VStack,
} from "@chakra-ui/react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextImage } from "../../components/NextImage";
import { getSchoolYear } from "utils/dates";
import { useRouter } from "next/router";
import { DeadlineCounter } from "components/DeadlineCounter";
import { isBefore } from "date-fns";
import AccessibleLink from "components/AccessibleLink";
import { DefHeader, LayoutProps } from "types/global";
import { fetchHydration, getHeader, useHydrater } from "state/layout";
import { IoMdArrowDropleft } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";
import { useSanity } from "hooks/use-check-error";
import _ from "underscore";
import { useSetLocaleSlug } from "state/locale";
import { LinkComponent } from "components/LinkComponent";
import jobModel from "models/job";
import defaultJob from "../../../prefetch/static/job.json";
interface Props {
    job: Jobs;
    mdx: MDXRemoteSerializeResult;
}

const JobView = ({
    header,
    footer,
    /* @ts-ignore */
    job = defaultJob,
    mdx,
    error,
    localeSlugs,
}: LayoutProps<Props>) => {
    const { t } = useTranslation("job");
    useSanity(error);
    useSetLocaleSlug(localeSlugs);
    useHydrater({ header, footer });

    const isAboveLg = useBreakpointValue({ base: false, lg: true });

    const company = job.company as Company;
    const image = job.banner as UploadFile;
    const cta = job?.contact?.find((item) => item?.type === "cta") || null;
    const contacts =
        job?.contact?.filter((item) => item?.type === "email") || [];
    const position = job?.position;
    const location = job?.location;
    return (
        <Flex overflow="hidden" direction="column" bg="white" pos="relative">
            {image && (
                <Flex
                    maxH="55vh"
                    w="full"
                    pos="relative"
                    overflow="hidden"
                    _after={{
                        content: "''",
                        position: "absolute",
                        bottom: 0,
                        top: 0,
                        left: 0,
                        right: 0,
                        bg: "linear-gradient(180deg, rgba(0,0,0,0) 65%, rgba(0,0,0,0.65) 100%)",
                    }}
                >
                    <NextImage
                        w="full"
                        width={image.width as number}
                        height={image.height as number}
                        src={image.url as string}
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        priority
                    />
                </Flex>
            )}
            <Box px={{ base: 4, lg: 12 }} pt={{ base: 4, lg: 8 }}>
                <AccessibleLink
                    href="/blog"
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                >
                    <Icon as={IoMdArrowDropleft} /> {t("common:back")}
                </AccessibleLink>
            </Box>
            <Box px={{ base: 4, lg: 12 }} pt={{ base: 4, lg: 8 }}>
                {cta && (
                    <LinkComponent
                        href={cta.href || "#"}
                        as={Button}
                        variant="iareSolid"
                        w="full"
                        rounded="md"
                        p={6}
                        fontWeight="600"
                    >
                        {cta.label}
                    </LinkComponent>
                )}
            </Box>
            <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={{ base: 6, lg: 16 }}
                px={{ base: 4, lg: 12 }}
                pt={{ base: 4, lg: 8 }}
                pb={{ base: 4, md: 16 }}
            >
                {!isAboveLg && company && (
                    <HStack
                        bg="gray.100"
                        w="full"
                        rounded="md"
                        p={6}
                        fontWeight="600"
                        spacing={4}
                        justify="space-evenly"
                    >
                        <Text textTransform="capitalize">{company.name}</Text>
                        {position && (
                            <Flex
                                justify="space-between"
                                textTransform="capitalize"
                            >
                                <Text>{position}</Text>
                            </Flex>
                        )}
                        {location && (
                            <Flex
                                justify="space-between"
                                textTransform="capitalize"
                            >
                                <Text>{location}</Text>
                            </Flex>
                        )}
                    </HStack>
                )}
                {isAboveLg && company && (
                    <Box as="aside" w="250px" h="full">
                        <Box
                            bg="gray.100"
                            rounded="md"
                            fontWeight="600"
                            maxH="250px"
                            overflow="hidden"
                        >
                            <NextImage
                                maxW="250px"
                                src={company?.logo?.url || "/logo.svg"}
                                width={company.logo?.width || 50}
                                height={company.logo?.height || 50}
                                layout="intrinsic"
                                objectFit="contain"
                            />
                        </Box>
                        <VStack
                            mt={14}
                            spacing={8}
                            divider={<StackDivider borderColor="gray.200" />}
                            align="stretch"
                        >
                            <Box>
                                {position && (
                                    <Flex
                                        justify="space-between"
                                        textTransform="capitalize"
                                    >
                                        <Text fontWeight="bold">
                                            {t("position")}
                                        </Text>
                                        <Text>{position}</Text>
                                    </Flex>
                                )}
                                {location && (
                                    <Flex
                                        justify="space-between"
                                        textTransform="capitalize"
                                    >
                                        <Text fontWeight="bold">
                                            {t("location")}
                                        </Text>
                                        <Text>{location}</Text>
                                    </Flex>
                                )}
                            </Box>
                            {contacts.length > 0 && (
                                <Box>
                                    {contacts.map((item, i) => (
                                        <AccessibleLink
                                            textTransform="capitalize"
                                            key={(item?.href ?? "") + i}
                                            href={`mailto:${item?.href}`}
                                        >
                                            {item?.label}
                                        </AccessibleLink>
                                    ))}
                                </Box>
                            )}
                        </VStack>
                    </Box>
                )}

                <Flex
                    overflow="hidden"
                    flexDirection="column"
                    flex={1}
                    p={4}
                    shadow="2xl"
                    rounded="md"
                    borderWidth="1px"
                    borderColor="gray.200"
                    minH="550px"
                    bg="white"
                    w="full"
                    pos="relative"
                >
                    <Heading pb={8}>{job.title}</Heading>
                    {mdx && <MDXLayout source={mdx} />}
                </Flex>
            </Stack>
        </Flex>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { jobs } = await jobModel.findAll();

    return {
        paths: jobs.map((e) => ({
            params: {
                slug: e.slug as string,
            },
        })),
        fallback: true,
    };
};
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const { job, error } = await jobModel.find(locale, params?.slug as string);

    const localeSlugs = extractLocales(
        { job },
        ["job"],
        ["locale", "slug"]
    ).map((item) => ({
        ...item,
        slug:
            item.locale === "sv"
                ? `/job/${item.slug}`
                : `/${item.locale}/job/${item.slug}`,
    }));

    const mdxSource = job?.body ? await serialize(job.body) : null;

    return {
        props: {
            error,
            localeSlugs,
            job,
            mdx: mdxSource,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default JobView;
