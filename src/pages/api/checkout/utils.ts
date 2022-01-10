import axios from "axios";

type NetsWebhook =
    | "checkout.completed"
    | "created"
    | "charged.created.v2"
    | "charged.failed"
    | "cancel.created"
    | "cancel.failed"
    | "refund.initiated.v2"
    | "refund.completed"
    | "refund.failed";

interface NetsRequestBody {
    order: {
        items: {
            reference: string;
            name: string;
            quantity: number;
            unit: string;
            unitPrice: number;
            taxRate?: number;
            taxAmount?: number;
            grossTotalAmount: number;
            netTotalAmount: number;
        }[];
        amount: number;
        currency: string;
        reference: string;
    };
    checkout: {
        termsUrl: string;
        publicDevice: boolean;
        charge: boolean;
        integrationType: "EmbeddedCheckout" | "HostedPaymentPage";
        merchantHandlesConsumerData: boolean;
        url: string;
        consumer?: {
            reference?: string;
            email?: string;
            shippingAddress?: {
                addressLine1?: string;
                addressLine2?: string;
                postalCode?: string;
                city?: string;
                country?: string;
            };
            phoneNumber?: {
                prefix?: string;
                number?: string;
            };
            privatePerson?: {
                firstName?: string;
                lastName?: string;
            };
        };
    };
    notifications: {
        webhooks: {
            eventName: string;
            url: string;
            authorization: string;
        }[];
    };
}

export function createBody({
    order,
    consumer,
    webhooks = [],
}: {
    order: NetsRequestBody["order"];
    consumer: NetsRequestBody["checkout"]["consumer"];
    webhooks?: NetsRequestBody["notifications"]["webhooks"];
}): NetsRequestBody {
    return {
        order,
        checkout: {
            termsUrl: process.env.NETS_TERMS || "https://iare.se",
            publicDevice: false,
            charge: true,
            integrationType: "EmbeddedCheckout",
            merchantHandlesConsumerData: false,
            url:
                process.env.NODE_ENV === "production"
                    ? "https://iare.se"
                    : "http://localhost:3000",
            consumer,
        },
        notifications: {
            webhooks,
        },
    };
}

export function createWebhook(eventName: NetsWebhook) {
    return {
        eventName: `payment.${eventName}`,
        url:
            process.env.NODE_ENV === "production"
                ? "https://iare.se/api/checkout/callback"
                : "http://localhost:3000/api/checkout/callback",
        authorization: process.env.NETS_AUTH || "invalid-environment",
    };
}

export const nets = axios.create({
    baseURL:
        process.env.NODE_ENV === "production"
            ? "https://api.dibspayment.eu/v1"
            : "https://test.api.dibspayment.eu/v1",
    headers: {
        Authorization: `Bearer ${process.env.NETS_BEARER}`,
    },
});

export function isFree(body: NetsRequestBody) {
    return body.order.amount === 0;
}
