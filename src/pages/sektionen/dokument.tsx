import strapi, { gql, axios } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import loadNamespaces from "next-translate/loadNamespaces";

const DocumentView = (params: any) => {
    const ContentStructure = dynamic(() => import("../chapter/document"));
    return <ContentStructure {...params} />;
};

export const getStaticProps: GetStaticProps = async ({
    locales,
    defaultLocale,
}) => {
    const locale = "sv-SE";
    const { data } = await axios.get("/document?_locale=" + locale);
    return {
        props: {
            locale,
            ...(await loadNamespaces({
                locales,
                defaultLocale,
                locale,
                pathname: "/chapter/document",
            })),
            document: data,
        },
    };
};

export default DocumentView;
