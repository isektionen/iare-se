import strapi, { gql } from "lib/strapi";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { Diet } from "../types/strapi";
export const eventId = atom<string>({
    key: "ATOM/EVENTID",
    default: "-1",
});

export const paymentId = atom<string>({
    key: "ATOM/PAYMENTID",
    default: "-1",
});

const createIntention = async (eventId: string) => {
    if (eventId === "-1") return;
    const url = process.env.NEXT_PUBLIC_CHECKOUT_URL + `/intent/${eventId}`;
    const res = await fetch(url, { method: "POST" });
    if (!res.ok) return;

    const data = await res.json();

    return data.paymentId;
};

export const getTicketInfo = async (paymentId: string) => {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/orders/${paymentId}/tickets`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) return;

    const data = await res.json();
    return data.tickets.map((ticket) => ticket.reference);
};

export const intention = atomFamily<string, string>({
    key: "ATOM/INTENTION",
    default: (eventId) =>
        selector({
            key: "SELECTOR/INTENTION",
            get: async ({ get }) => {
                let pid;
                pid = get(paymentId);
                if (pid === "-1") {
                    pid = await createIntention(eventId);
                }
                return pid;
            },
        }),
});

export const ticketState = atom<string[]>({
    key: "ATOM/TICKETS",
    default: [],
});
