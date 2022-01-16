import axios from "axios";

type NetsWebhook =
    | "checkout.completed"
    | "created"
    | "charge.created.v2"
    | "charge.failed"
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
            termsUrl:
                process.env.NODE_ENV === "production"
                    ? "https://iare.se"
                    : "http://localhost:3000",
            publicDevice: false,
            charge: true,
            integrationType: "EmbeddedCheckout",
            merchantHandlesConsumerData: true,
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
                : /*: "http://localhost:3000/api/checkout/callback"*/
                  "https://c628-2001-6b0-1-1041-5894-5c67-9849-b2e4.ngrok.io/api/checkout/callback",
        authorization: process.env.NETS_WEBHOOK_AUTH || "invalid-environment",
    };
}

export const nets = axios.create({
    baseURL:
        process.env.NODE_ENV === "production"
            ? "https://api.dibspayment.eu/v1"
            : "https://test.api.dibspayment.eu/v1",
    headers: {
        Authorization: process.env.NETS_BEARER,
    },
});

export function isFree(body: NetsRequestBody) {
    return body.order.amount === 0;
}
