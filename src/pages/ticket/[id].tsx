import React from "react";
import dynamic from "next/dynamic";
import { GetStaticPaths, GetStaticProps } from "next";
import strapi, { gql } from "lib/strapi";
import { OrderAsTicket } from "types/strapi";

interface Props {
    ticket: OrderAsTicket;
}

const TicketView = ({ ticket }: Props) => {
    const Content = dynamic(
        () => import("../../components/ticket/TicketContent"),
        {
            ssr: false,
        }
    );
    return <Content ticket={ticket} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data } = await strapi.query<{ orderAsTicket: OrderAsTicket }>({
        query: gql`
            query FindTicket($intentionId: String!) {
                orderAsTicket(intentionId: $intentionId) {
                    status
                    consumer {
                        firstName
                        lastName
                        email
                        phoneNumber
                        diets {
                            name
                        }
                        allergens {
                            name
                        }
                    }
                    event {
                        title
                        startTime
                        endTime
                        committee {
                            name
                        }
                        place {
                            name
                        }
                    }
                    ticketReference {
                        reference
                        price
                    }
                    reference
                }
            }
        `,
        variables: { intentionId: params?.id },
    });

    return {
        props: { ticket: data.orderAsTicket },
    };
};

export default TicketView;
