import { extractLocales } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import _ from "underscore";
import { fetchHydration } from "state/layout";
import { serialize } from "next-mdx-remote/serialize";
import eventModel from "models/event";
import View from "views/Event";

export default View;

export const getStaticPaths: GetStaticPaths = async () => {
    const { events } = await eventModel.findAll();
    return {
        paths: events.map((e) => ({
            params: {
                slug: e.slug as string,
            },
        })),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const { event, error, diets, allergies } = await eventModel.find(
        locale,
        params?.slug as string
    );

    const localeSlugs = extractLocales(
        { event },
        ["event"],
        ["locale", "slug"]
    ).map((item) => ({
        ...item,
        slug:
            item.locale === "sv"
                ? `/event/${item.slug}`
                : `/${item.locale}/event/${item.slug}`,
    }));

    const mdxSource = event?.body
        ? await serialize(event?.body as string)
        : null;
    return {
        props: {
            error,
            localeSlugs,
            mdx: mdxSource,
            event,
            diets,
            allergies,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};
