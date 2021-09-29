import { GetStaticProps } from "next";
import { fetchHydration } from "state/layout";
import _ from "underscore";
import representative from "models/representative";
import View from "views/Contact/Contact";

export default View;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const { representatives, error } = await representative.getRepresentatives(
        locale
    );
    const { objectives } = await representative.getObjectives(locale);

    return {
        props: {
            error,
            objectives,
            representatives,
            ...(await fetchHydration()),
        },
        revalidate: 20,
    };
};
