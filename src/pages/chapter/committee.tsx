import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { fetchHydration } from "state/layout";
import _ from "underscore";
import committee from "models/committee";
import View from "views/Committee/Committee";

export default View;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const { committeeLandingpage } = await committee.getLandingPage(locale);
    const { committees, error } = await committee.getCommittees(locale);
    const mdxSource = committeeLandingpage?.content
        ? await serialize(committeeLandingpage.content)
        : null;

    return {
        props: {
            error,
            mdx: mdxSource,
            title: committeeLandingpage?.title ?? null,
            committees,
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};
