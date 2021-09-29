import strapi, { extractLocales, gql } from "../../lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "../../types/strapi";
import { serialize } from "next-mdx-remote/serialize";

import { fetchHydration } from "../../state/layout";

import _ from "underscore";
import blog from "models/blog";
import View from "views/Blog/Slug";

export default View;

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await strapi.query<{ posts: Post[] }>({
        query: gql`
            query FindPostSlugs {
                posts {
                    slug
                }
            }
        `,
    });

    return {
        paths: data.posts.map((e) => ({
            params: {
                slug: e.slug as string,
            },
        })),
        fallback: true,
    };
};
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const { post, error } = await blog.getPost(locale, params?.slug as string);

    const localeSlugs = extractLocales(
        { post },
        ["post"],
        ["locale", "slug"]
    ).map((item) => ({
        ...item,
        slug:
            item.locale === "sv"
                ? `/blog/${item.slug}`
                : `/${item.locale}/blog/${item.slug}`,
    }));

    const mdxSource = post?.body ? await serialize(post.body) : null;

    return {
        props: {
            error,
            localeSlugs,
            post,
            mdx: mdxSource,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};
