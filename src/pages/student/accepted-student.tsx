import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { fetchHydration, useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { AcceptedStudent } from "types/strapi";

interface Props {
    title: string;
    images: Pick<AcceptedStudent, "images">;
    mdx: MDXRemoteSerializeResult;
}

const View = ({ title, images, mdx, header, footer }: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    return <div>Enter</div>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {
        data: { acceptedStudent },
    } = await strapi.query<{ acceptedStudent: AcceptedStudent }>({
        query: gql`
            query {
                acceptedStudent {
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
            acceptedStudent,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default View;
