import { extractLocales } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import _ from "underscore";
import { fetchHydration } from "state/layout";
import { serialize } from "next-mdx-remote/serialize";
import eventModel from "models/event";
import View from "views/Event";
import { conformLocale } from "utils/lang";
import defaultEvent from "../../../../prefetch/static/event.json";
export default View;

export const getStaticPaths: GetStaticPaths = async () => {
    const { events } = await eventModel.findAll();
    return {
        paths: events.map((e) => ({
            params: {
                slug: e.slug as string,
            },
        })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    locale = conformLocale(locale);
    const { event, error } = await eventModel.find(
        locale,
        params?.slug as string
    );
    const _event = event ?? defaultEvent;

    const requiresPassword = await eventModel.checkIfGuarded(
        locale,
        params?.slug as string
    );

    const localeSlugs = extractLocales(
        { event: _event },
        ["event"],
        ["locale", "slug"]
    ).map((item) => ({
        ...item,
        slug:
            item.locale === conformLocale("sv")
                ? `/event/${item.slug}`
                : `/${item.locale}/event/${item.slug}`,
    }));

    const mdxSource = _event?.body
        ? await serialize(_event?.body as string)
        : null;

    return {
        props: {
            error,
            localeSlugs,
            mdx: mdxSource,
            _event,
            requiresPassword,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};
