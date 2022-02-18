import { extractLocales } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { fetchHydration } from "state/layout";
import _ from "underscore";
import jobModel from "models/job";
import View from "views/Job";
import defaultJob from "../../../prefetch/static/job.json";
import { conformLocale } from "utils/lang";

export default View;

export const getStaticPaths: GetStaticPaths = async () => {
    const { jobs } = await jobModel.findAll();

    return {
        paths: jobs.map((e) => ({
            params: {
                slug: e.slug as string,
            },
        })),
        fallback: false,
    };
};
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    locale = conformLocale(locale);

    const { job, error } = await jobModel.find(locale, params?.slug as string);

    const _job = job ?? defaultJob;
    const localeSlugs = extractLocales(
        { job: _job },
        ["job"],
        ["locale", "slug"]
    ).map((item) => ({
        ...item,
        slug:
            item.locale === conformLocale("sv")
                ? `/job/${item.slug}`
                : `/${item.locale}/job/${item.slug}`,
    }));

    const mdxSource = _job?.body ? await serialize(_job.body) : null;

    return {
        props: {
            error,
            localeSlugs,
            job: _job,
            mdx: mdxSource,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};
