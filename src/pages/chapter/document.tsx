import { GetStaticProps } from "next";

import _ from "underscore";
import { fetchHydration } from "state/layout";
import document from "models/document";
import View from "views/Document";
import { conformLocale } from "utils/lang";

export default View;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    locale = conformLocale(locale);

    const { documents, error } = await document.getDocuments(locale);
    return {
        props: {
            ...(await fetchHydration()),
            data: documents,
            error,
        },
        revalidate: 60,
    };
};
