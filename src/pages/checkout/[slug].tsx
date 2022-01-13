import { Box } from "@chakra-ui/react";
import { Breadcrumb } from "components/Breadcrumb";
import eventModel from "models/event";
import { GetServerSideProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { Event } from "types/strapi";
import { isBeforeDeadline } from "utils/dates";
import { conformLocale } from "utils/lang";

interface Props {
    event: Event;
}

const View = ({ event }: Props) => {
    const router = useRouter();

    const path = [
        { label: "Blogg", href: "/blog" },
        { label: event.title, href: `/event/${event.slug}` },
        { label: "Osa", href: `#` },
    ];

    useEffect(() => {
        router.replace(`/checkout/${event.slug}`, undefined, { shallow: true });
    }, []);

    return (
        <React.Fragment>
            <Breadcrumb path={path} />
        </React.Fragment>
    );
};

export default View;

export const getServerSideProps: GetServerSideProps = async ({
    locale,
    params,
    query,
}) => {
    locale = conformLocale(locale);
    const { slug } = params as { slug: string };
    const isGuarded = await eventModel.checkIfGuarded(locale, slug);
    if (isGuarded) {
        const { password = null } = query as { password: string | null };
        const data = await eventModel.findGuarded(locale, slug, password);

        if (!data.event) {
            return {
                redirect: {
                    destination: `/event/${slug}?callback=invalid.password`,
                    permanent: true,
                },
            };
        }

        if (!isBeforeDeadline(data.event?.schedule?.deadline)) {
            return {
                redirect: {
                    destination: `/event/${slug}?callback=due.date`,
                    permanent: true,
                },
            };
        }
    }

    const data = await eventModel.find(locale, slug);
    return {
        props: { event: data.event },
    };
};
