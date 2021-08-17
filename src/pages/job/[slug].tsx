import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { Jobs } from "types/strapi";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import { MDXLayout } from "components/mdx/Layout";
import { LayoutWrapper } from "components/layout/LayoutWrapper";
import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextImage } from "../../components/NextImage";
import { getSchoolYear } from "utils/dates";
import { useRouter } from "next/router";
import { DeadlineCounter } from "components/DeadlineCounter";
import { isBefore } from "date-fns";
import AccessibleLink from "components/AccessibleLink";
import { DefHeader, LayoutProps } from "types/global";
import { fetchHydration, getHeader, useHydrater } from "state/layout";
interface Props {
    job: Jobs;
    mdx: MDXRemoteSerializeResult;
}

const JobView = ({ header, footer, job, mdx }: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    const router = useRouter();
    const cta = job.contact?.find((c) => c?.type === "cta");

    const isActive = isBefore(new Date(), new Date(job.deadlineDate));
    return (
        <Flex direction="column" px={24} py={12}>
            <Center>
                <Flex direction="column" align="center">
                    <AccessibleLink
                        href={job.company?.website ?? "#"}
                        isExternal
                    >
                        <NextImage
                            mb={8}
                            src={job.company?.logo?.url ?? ""}
                            alt={
                                job.company?.logo?.alternativeText ?? "logotype"
                            }
                            width={job.company?.logo?.width ?? 160 * 3}
                            height={job.company?.logo?.height ?? 90 * 3}
                        />
                    </AccessibleLink>
                    <Heading as="h1" size="2xl" textAlign="center">
                        {job.title}
                    </Heading>
                    <Flex
                        fontSize="xl"
                        w="25%"
                        justify="space-around"
                        py={4}
                        textTransform="capitalize"
                    >
                        <span>{job.position}</span>
                        <span>&bull;</span>
                        <span>{job.location}</span>
                    </Flex>
                    <Flex>
                        Riktat åt årskurs{" "}
                        {job.year?.map(getSchoolYear).join(", ")}
                    </Flex>
                    {cta && isActive && (
                        <Button
                            mt={12}
                            variant="iareSolid"
                            disabled={!isActive}
                            onClick={() => {
                                if (isActive) {
                                    window.open(cta.href, "__blank");
                                }
                            }}
                            w={{ base: "full", md: "25%" }}
                        >
                            {cta.label}
                        </Button>
                    )}
                </Flex>
            </Center>
            <DeadlineCounter
                deadline={job.deadlineDate}
                description={{
                    before: "Det är {TIMELEFT} tills ansökan stänger",
                    after: "Det var {TIMELEFT} tills ansökan stängde",
                }}
            />
            <MDXLayout source={mdx} />
        </Flex>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await strapi.query<{ jobs: Jobs[] }>({
        query: gql`
            query {
                jobs {
                    slug
                }
            }
        `,
    });

    return {
        paths: data.jobs.map((e) => ({
            params: {
                slug: e.slug as string,
            },
        })),
        fallback: "blocking",
    };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data } = await strapi.query<{ job: Jobs }>({
        query: gql`
            query FindJob($slug: ID!) {
                job(id: $slug) {
                    created_at
                    title
                    deadlineDate
                    startDate
                    jobCategory {
                        name
                    }
                    company {
                        name
                        logo {
                            width
                            height
                            url
                        }
                        website
                    }
                    year {
                        year
                    }
                    body
                    contact {
                        label
                        type
                        href
                    }
                    position
                    location
                }
            }
        `,
        variables: { slug: params?.slug },
    });

    return {
        props: {
            ...(await fetchHydration()),
            job: data.job,
            mdx: await serialize(data.job.body),
        },
    };
};

export default JobView;
