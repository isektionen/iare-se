import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { fetchHydration, useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { Chapter } from "types/strapi";

interface Props {
    title: string;
    images: Pick<Chapter, "images">;
    board: Pick<Chapter, "board">;
    mdx: MDXRemoteSerializeResult;
}

const View = ({ title, images, mdx, header, footer }: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    return <div>Enter</div>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {
        data: { chapter },
    } = await strapi.query<{ chapter: Chapter }>({
        query: gql`
            query {
                chapter {
                    content
                    title
                    board {
                        representatives {
                            user {
                                firstname
                                lastname
                            }
                            cover {
                                url
                            }
                            committee_roles {
                                role
                                committee_objectives {
                                    objective
                                }
                            }
                        }
                    }
                    images {
                        url
                    }
                }
            }
        `,
    });
    return {
        props: {
            chapter,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default View;
