import { getPathOf } from "lib/api";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
    params: {
        slug: string;
    };
}

const Event = (props: Props) => {
    return <div>{props.params.slug}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getPathOf("event");
    return {
        paths: paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
        props: { params },
        revalidate: true,
    };
};

export default Event;
