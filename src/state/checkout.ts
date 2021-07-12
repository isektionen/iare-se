import strapi, { gql } from "lib/strapi";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { ComponentEventTicketReference } from "types/strapi";
export const eventId = atom<string>({
    key: "ATOM/EVENTID",
    default: "-1",
});

export const paymentState = atom<string>({
    key: "ATOM/PAYMENTID",
    default: "-1",
});

export const intentionState = atom<string>({
    key: "ATOM/INTENTIONID",
    default: "-1",
});

const createIntention = async (eventId: string) => {
    if (eventId === "-1") return { intentionId: "-1" };
    const url = process.env.NEXT_PUBLIC_CHECKOUT_URL + `/intent/${eventId}`;
    const res = await fetch(url, { method: "POST" });
    if (!res.ok) return { intentionId: "-1" };

    const data = await res.json();

    const body = { intentionId: data.intentionId } as {
        paymentId?: string;
        intentionId: string;
    };
    if (data.hasOwnProperty("paymentId")) body["paymentId"] = data.paymentId;
    return body;
};

export const getDetails = async (
    intentionId: string
): Promise<{ tickets: ComponentEventTicketReference[]; paymentId: string }> => {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/orders/${intentionId}/details`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok)
        return {
            tickets: [],
            paymentId: "-1",
        };

    const data = await res.json();
    return data;
};

export const validIntentionId = async (intentionId: string) => {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/orders/${intentionId}/valid`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) return false;

    const data = await res.json();
    return data.valid;
};

export const validatePassword = async (eventId: string, password: string) => {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/events/${eventId}/password`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.valid;
};

export const validateIntention = selectorFamily<boolean, string>({
    key: "SELECTOR/VALIDATE",
    get: (intentionId: string) => async () => {
        return await validIntentionId(intentionId);
    },
});

export const ticketsFromIntention = selector<string[] | undefined>({
    key: "SELECTOR/TICKETS",
    get: async ({ get }) => {
        const intentionId = get(intentionState);
        if (intentionId === "-1") return;
        const details = await getDetails(intentionId);
        const tickets = details.tickets.map((ticket) => ticket.uid);
        return tickets as string[];
    },
});

export const pidFromIntention = selector<string | undefined>({
    key: "SELECTOR/PID",
    get: async ({ get }) => {
        const intentionId = get(intentionState);
        const pid = get(paymentState);
        if (pid !== "-1") return pid;
        if (intentionId === "-1") return;
        const details = await getDetails(intentionId);
        return details.paymentId;
    },
});

export const intention = atomFamily<
    { paymentId?: string; intentionId: string },
    string
>({
    key: "ATOM/INTENTION",
    default: (eventId) =>
        selector({
            key: "SELECTOR/INTENTION",
            get: async ({ get }) => {
                let pid, iid;
                pid = get(paymentState);
                iid = get(intentionState);
                if (iid === "-1") {
                    const { paymentId, intentionId } = await createIntention(
                        eventId
                    );
                    if (paymentId) pid = paymentId;
                    iid = intentionId;
                }
                return { intentionId: iid, paymentId: pid };
            },
        }),
});
