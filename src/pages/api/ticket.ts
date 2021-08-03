import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import axios from "axios";
import strapi, { gql } from "lib/strapi";
import { OrderAsTicket } from "types/strapi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id;
    const event = req.query.event;
    if (!id || !event) {
        res.status(400).json({ error: "missing query params" });
        return;
    }

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
        variables: { intentionId: id },
    });

    if (!data || !data.orderAsTicket) {
        res.status(400).json({ error: "ticket not found" });
        return;
    }

    const cookie = req.cookies;
    console.log(cookie);

    const token = jwt.sign({}, "shhhh");
    res.status(201).setHeader("Set-Cookie", token).json({ token });
};

export default handler;
