import strapi, { extractLocales, gql } from "../../lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "../../types/strapi";
import { serialize } from "next-mdx-remote/serialize";

import { fetchHydration } from "../../state/layout";

import _ from "underscore";
import blog from "models/blog";
import View from "views/Blog/Slug";
import { conformLocale } from "utils/lang";
import defaultPost from "../../../prefetch/static/blog.json";

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
        fallback: false,
    };
};
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    locale = conformLocale(locale);
    const { post, error } = await blog.getPost(locale, params?.slug as string);

    const _post = post ?? defaultPost;
    const localeSlugs = extractLocales(
        { post: _post },
        ["post"],
        ["locale", "slug"]
    ).map((item) => ({
        ...item,
        slug:
            item.locale === conformLocale("sv")
                ? `/blog/${item.slug}`
                : `/${item.locale}/blog/${item.slug}`,
    }));

    const mdxSource = _post?.body ? await serialize(_post.body) : null;

    return {
        props: {
            error,
            localeSlugs,
            post: _post,
            mdx: mdxSource,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};
