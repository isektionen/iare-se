import { GetStaticProps } from "next";
import { fetchHydration } from "state/layout";

import _ from "underscore";
import View from "views/BookingForm";

export default View;

export const getStaticProps: GetStaticProps = async (ctx) => {
    return {
        props: {
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};
