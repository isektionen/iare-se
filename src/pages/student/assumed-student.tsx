import student from "models/student";
import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { fetchHydration } from "state/layout";
import { conformLocale } from "utils/lang";
import View from "views/AssumedStudent";

export default View;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    locale = conformLocale(locale);

    const { assumedStudent, error } = await student.assumed(locale);
    const mdxSource = assumedStudent?.content
        ? await serialize(assumedStudent.content as string)
        : null;

    return {
        props: {
            error,
            images: assumedStudent?.images ?? [],
            title: assumedStudent?.title ?? "",
            mdx: mdxSource,

            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};
