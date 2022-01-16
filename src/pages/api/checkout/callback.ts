// @ts-nocheck
/**
 * callback endpoint is for webhooks recieved from nets.
 * For the time being it only supports these events:
 *  * payment.created
 *  * payment.charge.created.v2
 *  * payment.charge.failed
 *  * payment.checkout.completed
 *
 * More on these events can be read here:
 * https://developers.nets.eu/nets-easy/en-EU/api/webhooks/#payment-events
 */

import { axios as strapi } from "lib/strapi";
import { NextApiRequest, NextApiResponse } from "next";
import _ from "underscore";

interface BaseNetsWebhook {
    id: string;
    merchantId: string;
    timestamp: string;
    data: {
        paymentId: string;
        order: {
            amount: number;
            reference: string;
            orderItems: {
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
        };
    };
}

interface IOrderBody {
    paymentData: {
        paymentId?: string;
        chargeId?: string;
        refundId?: string;
        payment?: {
            method?: string;
            type?: string;
        };
        amount?: {
            amount?: number;
            currency?: string;
        };
        invoiceDetails?: {
            distributionType: string;
            invoiceDueDate: string;
            invoiceNumber: number;
        };
    };
    order: {
        amount: number;
        reference: string;
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
    };
    errors?: Record<string, string>[];
    timestamp: string;
    status: "created" | "charged" | "completed" | "failed" | "refunded";
}

interface NetsCreated extends BaseNetsWebhook {
    event: "payment.created";
}

interface NetsChargeCreated extends BaseNetsWebhook {
    event: "payment.charge.created.v2";
    data: {
        chargeId: string;
        paymentMethod: string;
        paymentType: string;
        amount: {
            amount: number;
            currency: string;
        };
        paymentId: string;
        order: {
            amount: number;
            reference: string;
            orderItems: {
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
        };
    };
}

interface NetsChargeFailed extends BaseNetsWebhook {
    event: "payment.charge.failed";
    data: {
        paymentId: string;
        order: {
            amount: number;
            reference: string;
            orderItems: {
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
        };
        error?: {
            message?: string;
            code?: string;
            source?: string;
        };
        chargeId: string;
        reservationId: string;
        amount: {
            amount: number;
            currency: string;
        };
    };
}

interface NetsCheckoutCompleted extends BaseNetsWebhook {
    event: "payment.checkout.completed";
}

const callback = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(400);
    }

    const auth = (req.headers["Authorization"] ||
        req.headers.authorization) as string;

    const [bearer, token] = auth.split(" ", 1);
    if (
        token !== process.env.NETS_WEBHOOK_AUTH &&
        process.env.NODE_ENV === "production"
    ) {
        return res.status(401);
    }

    const { event, data, timestamp } = req.body as
        | NetsChargeFailed
        | NetsChargeCreated
        | NetsCheckoutCompleted
        | NetsCreated;

    // orderRefence is event.slug + 6 random characters
    const orderReference = data.order.reference;

    let body = {
        timestamp,
        errors: [] as Record<string, string>[],
    } as IOrderBody;

    switch (event) {
        case "payment.created":
            body.status = "created";
            body.paymentData.paymentId = data.paymentId;
            break;
        case "payment.charge.failed":
            console.error("WEBHOOK ERROR: " + data.order.reference);
            // console.error(data?.error);

            body.status = "failed";
            body.paymentData.paymentId = data.paymentId;
            /* @ts-ignore */
            body.paymentData.chargeId = data.chargeId ? data.chargeId : "N/A";
            /* @ts-ignore */
            body.errors = data.error ? [data?.error] : [];
            break;
        case "payment.charge.created.v2":
            body.status = "charged";
            body.paymentData.paymentId = data.paymentId;
            /* @ts-ignore */
            body.paymentData.chargeId = data.chargeId ? data.chargeId : "N/A";
            body.paymentData.amount = data.amount;
            body.paymentData.payment = {
                method: data.paymentMethod,
                type: data.paymentType,
            };
            break;
        case "payment.checkout.completed":
            body.status = "completed";
            body.paymentData.paymentId = data.paymentId;
            body.order = {
                items: data.order.orderItems,
                reference: data.order.reference,
                amount: data.order.amount,
            };
            break;
    }

    console.log("NETS WEBHOOK FOR REF: ", orderReference);
    await strapi.put(`/orders/${orderReference}`, body);

    return res.status(200);
};

export default callback;
