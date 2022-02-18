import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { fetchHydration } from "state/layout";
import { CommitteeFunction } from "types/strapi";
import _ from "underscore";
import representativeModel from "models/representative";
import View from "views/Contact/Slug";
import { conformLocale } from "utils/lang";

export default View;

export const getStaticPaths: GetStaticPaths = async () => {
    const {
        data: { committeeFunctions },
    } = await strapi.query<{ committeeFunctions: CommitteeFunction[] }>({
        query: gql`
            query FindCommitteeRepSlugs {
                committeeFunctions(where: { slug: "skyddsombud" }) {
                    slug
                }
            }
        `,
    });

    return {
        paths: committeeFunctions.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    };
};
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    locale = conformLocale(locale);

    const { representative, error } =
        await representativeModel.getRepresentative(
            locale,
            params?.slug as string
        );
    return {
        props: {
            error,
            ...(await fetchHydration()),
            repr: representative,
        },
        revalidate: 20,
    };
};
