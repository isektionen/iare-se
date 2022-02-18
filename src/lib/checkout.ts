import { ICreateBody } from "pages/api/checkout/create";
import _ from "underscore";

export const checkoutClient = {
    cancel: async (orderReference: string) => {
        await fetch("/api/checkout/cancel", {
            body: JSON.stringify({ orderReference }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
    },
    create: async (
        body: ICreateBody
    ): Promise<{
        reserved: boolean;
        due?: {
            reference: string;
            available: Boolean;
        };
        paymentId?: string;
        reference?: string;
    }> => {
        const result = await fetch("/api/checkout/create", {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        if (result.status === 200) {
            const data = await result.json();
            if (_.has(data, "due")) {
                return {
                    reserved: false,
                    due: data.due,
                };
            }
            if (_.has(data, "paymentId")) {
                return {
                    reserved: true,
                    paymentId: data.paymentId,
                    reference: data.reference,
                };
            }
            return { reserved: true, reference: data.reference };
        }
        return {
            reserved: false,
            reference: undefined,
        };
    },
};
