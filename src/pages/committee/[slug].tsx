import gql from "graphql-tag";
import strapi, { extractLocales } from "lib/strapi";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { fetchHydration } from "state/layout";
import { Committee } from "types/strapi";
import committeeModel from "models/committee";
import View from "views/Committee/Slug";
import { conformLocale } from "utils/lang";

export default View;

export const getStaticPaths: GetStaticPaths = async (params) => {
    const {
        data: { committees },
    } = await strapi.query<{ committees: Committee[] }>({
        query: gql`
            query {
                committees(where: { slug: "styrelsen" }) {
                    slug
                }
            }
        `,
    });

    return {
        paths: committees
            .filter(({ slug }) => slug !== null)
            .map(({ slug }) => ({ params: { slug: slug as string } })),
        fallback: "blocking",
    };
};
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    locale = conformLocale(locale);

    const { committees, error } = await committeeModel.getCommittees(locale);

    const { committee, error: committeeError } = committeeModel.find(
        committees,
        {
            slug: params?.slug as string,
        }
    );
    const mdxSource = committee?.content
        ? await serialize(committee.content as string)
        : null;

    const localeSlugs = extractLocales(
        { committee },
        ["committee"],
        ["locale", "slug"]
    ).map((item) => ({
        ...item,
        slug:
            item.locale === "sv"
                ? `/committee/${item.slug}`
                : `/${item.locale}/committee/${item.slug}`,
    }));

    return {
        props: {
            error: error || committeeError,
            localeSlugs,
            mdx: mdxSource,
            committee,
            committees,
            ...(await fetchHydration()),
        },
        revalidate: 20,
    };
};
