import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { ICheckoutSession } from "types/checkout";

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

export const intention = atomFamily<string, string>({
    key: "ATOM/INTENTION",
    default: (eventId: string) => createIntention(eventId),
});

/**
 *  const url =
                process.env.NEXT_PUBLIC_CHECKOUT_URL || "http://localhost:1338";
            const intent = url + `/intent/${eventId}`;
            const data = await (
                await fetch(intent, {
                    method: "POST",
                })
            ).json();
 */
