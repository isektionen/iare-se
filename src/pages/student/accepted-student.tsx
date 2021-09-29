import student from "models/student";
import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { fetchHydration } from "state/layout";
import View from "views/AcceptedStudent";

export default View;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const { acceptedStudent, error } = await student.accepted(locale);

    const mdxSource = acceptedStudent?.content
        ? await serialize(acceptedStudent.content)
        : null;

    return {
        props: {
            error,
            images: acceptedStudent?.images,
            title: acceptedStudent?.title,
            mdx: mdxSource,

            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};
