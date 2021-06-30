import { useRecoilSSRValue } from "components/RecoilSSR";
import strapi, { gql } from "lib/strapi";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import { useRecoilCallback } from "recoil";
import { eventId, intention } from "state/checkout";
import { Event } from "types/strapi";

import { useRouter } from "next/router";

const EventView = (event: Event) => {
    const router = useRouter();

    const { paymentId } = router.query;
    const checkoutSession = useRecoilCallback(
        ({ set, snapshot, reset }) =>
            async () => {
                set(eventId, event.id);
                const paymentId = await snapshot.getPromise(intention);
                if (paymentId) {
                    router.push(`/event/${event.slug}?paymentId=${paymentId}`);
                }
            }
    );
    useEffect(() => {
        checkoutSession();
    }, [paymentId]);
    return <div>test</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await strapi.query<{ events: Event[] }>({
        query: gql`
            query {
                events {
                    id
                    slug
                }
            }
        `,
    });
    return {
        paths: data.events.map((e) => ({
            params: {
                slug: e.slug as string,
            },
        })),
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data } = await strapi.query<{ event: Event }>({
        query: gql`
            query FindEvent($slug: ID!) {
                event(id: $slug) {
                    id
                    slug
                    title
                    committee {
                        name
                    }
                    tickets {
                        Tickets {
                            id
                            name
                            price
                        }
                        allowMultiple
                    }
                    servingOptions {
                        servingFood
                    }
                    place {
                        name
                        detailedStreetInfo {
                            streetName
                            streetPostalCode
                        }
                        showMap
                    }

                    startTime
                    endTime
                    deadline
                    published_at
                }
            }
        `,
        variables: { slug: params?.slug },
    });
    return {
        props: { ...data.event },
        revalidate: 60,
    };
};

export default EventView;
