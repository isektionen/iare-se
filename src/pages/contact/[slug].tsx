import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { fetchHydration, useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { CommitteeFunction } from "types/strapi";
import _ from "underscore";

interface Props {
    committeeFunctions: CommitteeFunction[];
}

const RoleView = ({
    header,
    footer,
    committeeFunctions,
}: LayoutProps<Props>) => {
    useHydrater({ header, footer });

    return <div>Enter</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const {
        data: { committeeFunctions },
    } = await strapi.query<{ committeeFunctions: CommitteeFunction[] }>({
        query: gql`
            query {
                committeeFunctions {
                    slug
                }
            }
        `,
    });

    return {
        paths: committeeFunctions.map(({ slug }) => ({ params: { slug } })),
        fallback: false,
    };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const {
        data: { committeeFunctions },
    } = await strapi.query<{ committeeFunctions: CommitteeFunction[] }>({
        query: gql`
            query FindContact($slug: String!) {
                committeeFunctions(where: { slug: $slug }) {
                    contact
                    role
                    role_description
                    representatives {
                        user {
                            firstname
                            lastname
                        }
                        personal_description
                        cover {
                            url
                            formats
                        }
                    }
                }
            }
        `,
        variables: { slug: params?.slug },
    });
    return {
        props: {
            ...(await fetchHydration()),
            committeeFunctions,
        },
    };
};

export default RoleView;
