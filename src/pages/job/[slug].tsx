import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { Jobs } from "types/strapi";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import { MDXLayout } from "components/mdx/Layout";

const JobView = ({ job, mdx }: any) => {
    return <MDXLayout source={mdx} />;
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
            job: data.job,
            mdx: await serialize(data.job.body),
        },
    };
};

export default JobView;
