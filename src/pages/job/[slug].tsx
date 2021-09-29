import { extractLocales } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { fetchHydration } from "state/layout";
import _ from "underscore";
import jobModel from "models/job";
import View from "views/Job";

export default View;

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
