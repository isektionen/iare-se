import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { fetchHydration, useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { AssumedStudent } from "types/strapi";

interface Props {
    title: string;
    images: Pick<AssumedStudent, "images">;
    mdx: MDXRemoteSerializeResult;
}

const View = ({ title, images, mdx, header, footer }: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    return <div>Enter</div>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {
        data: { assumedStudent },
    } = await strapi.query<{ assumedStudent: AssumedStudent }>({
        query: gql`
            query {
                assumedStudent {
                    content
                    title
                    images {
                        url
                    }
                }
            }
        `,
    });
    return {
        props: {
            assumedStudent,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default View;
