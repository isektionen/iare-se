import { GetStaticProps } from "next";
import { fetchHydration } from "state/layout";
import _ from "underscore";
import blog from "models/blog";
import View from "views/Blog/Blog";

export default View;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const { feed, error } = await blog.getFeed(locale);
    const { categories } = await blog.getCategories(locale, feed);

    return {
        props: {
            feed,
            categories,
            error,
            ...(await fetchHydration()),
        },
        revalidate: 20,
    };
};
