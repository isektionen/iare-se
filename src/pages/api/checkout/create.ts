import { axios as strapi } from "lib/strapi";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { MetaOption } from "state/products";
import _ from "underscore";
import { createBody, createStatus, createWebhook, isFree, nets } from "./utils";

export interface NetsCustomer {
    firstName: string;
    lastName: string;
    phone: {
        prefix?: string;
        number?: string;
    };
    email: string;
}

interface IOrderItem {
    reference: string;
    __reference: string;
    name: string;
    quantity: number;
}

export interface ICreateBody {
    items: IOrderItem[];
    reference: string | number; // event-slug
    customer: NetsCustomer;
    options: {
        label: string;
        type: string;
        reference: string;
        data: Record<string, (string | boolean | MetaOption | null)[]>;
    }[];
}

interface Product {
    name: string;
    reference: string;
    stock: number;
    count: number;
    price: number;
}

type IProductBody = Product[];

const createClamp = (min: number, max: number) => (num: number) =>
    Math.min(Math.max(num, min), max);

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(400);
    }

    const {
        items,
        reference: eventRef,
        customer,
        options = [],
    } = req.body as ICreateBody;
    if ([items, eventRef, customer, options].some((p) => p === undefined)) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const incomingItemReferences = items.map((r) => r.reference);
    const incomingRelationalReferences = items.map((r) => r.__reference);

    // already fucked here
    // get products from event-reference
    const productData = await strapi.get(`/events/${eventRef}/products`);
    if (productData.status !== 200) {
        return res.status(400).json({
            error: "No products found for event with given reference",
            eventRef,
        });
    }

    // check if event is bookable
    const eventData = await strapi.get(`/events/${eventRef}/status`);
    if (eventData.status !== 200) {
        return res.status(400).json({
            error: "Cannot RSVP to event",
            eventRef,
        });
    }

    const products = productData.data as IProductBody;

    const productReferences = products.map((p) => p.reference);

    const referenceIndex = _.indexBy(products, "reference");
    // filter out invalid incoming item.references from client
    const refdiff = _.difference(incomingItemReferences, productReferences);
    if (refdiff.length > 0) {
        return res
            .status(400)
            .json({ error: "Product reference was not found" });
    }

    const adaptedItems = items
        .map((i) => {
            const taxRate = 0;
            const ref = referenceIndex[i.reference];

            /**
             * Amounts are specified in the lowest monetary unit for the given currency,
             * without punctuation marks. For example: 100,00 SEK
             * is specified as 10000 and 9.99 SEK is specified as 999.
             */
            const price = ref.price * 100;

            /* 
            quantity gets clamped between 0 and the maximum available number,
            meaning that if a product has 20 items left, and a customer requests 19.
            the clamped value will be 19.

            However, if the customer requested 21, it would be clamped to 20.
            */
            const clamp = createClamp(0, ref.stock - ref.count);
            const quantity = clamp(i.quantity);
            const netTotalAmount = quantity * price;

            return {
                ...i,
                unitPrice: price,
                quantity,
                unit: "pcs",
                taxRate,
                taxAmount: netTotalAmount * (taxRate / 100),
                grossTotalAmount: netTotalAmount * (1 + taxRate / 100),
                netTotalAmount,
            };
        })
        .filter((i) => i.quantity > 0);

    // sum up totalAmount
    const amount = adaptedItems.reduce(
        (acc, it) => acc + it.grossTotalAmount,
        0
    );
    const currency = "SEK";
    const reference = `${eventRef}::${nanoid(6)}`;

    const order = {
        items: adaptedItems,
        amount,
        currency,
        reference,
    };

    const body = createBody({
        order,
        consumer: {
            email: customer.email,
            phoneNumber: customer.phone,
            privatePerson: {
                firstName: customer.firstName,
                lastName: customer.lastName,
            },
        },
        // webhooks will fill order with paymentData and possible errors
        webhooks: [
            createWebhook("created", { reference: order.reference }),
            createWebhook("charge.created.v2", { reference: order.reference }),
            createWebhook("charge.failed", { reference: order.reference }),
            createWebhook("checkout.completed", { reference: order.reference }),
        ],
    });

    // reserve products

    body.order.items.forEach(async (i) => {
        try {
            await strapi.get(
                `/products/${i.reference}/${eventRef}/reserve?quantity=${i.quantity}`
            );
        } catch (e) {
            return res.status(200).json({
                reserved: false,
                due: {
                    reference: i.reference,
                    available: false,
                },
            });
        }
    });

    // creating order in backend independently of it being free or paid.
    // each order will be uniquely by order.reference
    await strapi.post("/orders", {
        customerData: {
            firstName: body.checkout.consumer?.privatePerson?.firstName,
            lastName: body.checkout.consumer?.privatePerson?.lastName,
            phoneNumber: body.checkout.consumer?.phoneNumber,
            email: body.checkout.consumer?.email,
        },
        options,
        order: body.order, //contains unique reference
        errors: [],
        sentEmailConfirmation: false,
        recieptUrl:
            process.env.NODE_ENV === "production"
                ? `https://www.iare.se/event/${eventRef}/summary?reference=${body.order.reference}`
                : `http://localhost:3000/event/${eventRef}/summary?reference=${body.order.reference}`,
        status: isFree(body)
            ? [createStatus("completed")]
            : [createStatus("created")],
    });

    //console.log(JSON.stringify(body, null, 2));

    if (amount === 0) {
        return res.status(200).json({
            reserved: true,
            reference: body.order.reference,
        });
    }

    // requesting paymentId from nets
    const netsData = await nets.post("/payments", body);
    if (netsData.status === 400) {
        return res.status(400).json({
            errors:
                process.env.NODE_ENV === "production"
                    ? "🥞"
                    : netsData.data.errors,
        });
    }
    if (netsData.status === 401) {
        return res.status(401);
    }
    if (netsData.status === 500) {
        console.error(JSON.stringify(netsData.data, null, 2));
        return res.status(500);
    }
    /*
    {
      "paymentId": "0260000060003b7b47f0833960dc60d6"
    }
    */
    return res.status(200).json({
        reserved: true,
        paymentId: netsData.data.paymentId as string,
        reference: body.order.reference,
    });
};

export default create;
