import { GetStaticProps } from "next";
import { fetchHydration } from "state/layout";
import blog from "models/blog";
import View from "views/LandingPage";
import { conformLocale } from "utils/lang";

export default View;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    locale = conformLocale(locale);
    const { feed, error } = await blog.getFeed(locale);
    return {
        props: {
            error,
            feed,
            ...(await fetchHydration()),
        },
        revalidate: 20,
    };
};
