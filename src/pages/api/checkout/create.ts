import { axios as strapi } from "lib/strapi";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import _ from "underscore";
import { createBody, createWebhook, isFree, nets } from "./utils";

interface IOrderItem {
    reference: string;
    name: string;
    quantity: number;
}

interface ICreateBody {
    items: IOrderItem[];
    reference: string | number; // event-slug
    customer: {
        firstName: string;
        lastName: string;
        phone: {
            prefix: string;
            number: string;
        };
        email: string;
    };
    options: Record<string, (string | boolean)[]>;
}

interface Product {
    name: string;
    reference: string;
    stock: number;
    count: number;
    price: number;
}

interface IProductBody {
    products: Product[];
}

const createClamp = (min: number, max: number) => (num: number) =>
    Math.min(Math.max(num, min), max);

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        items,
        reference: eventRef,
        customer,
        options,
    } = req.body as ICreateBody;
    if ([items, eventRef, customer, options].some((p) => p === undefined)) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const itemReferences = items.map((r) => r.reference);

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

    const { products } = productData.data as IProductBody;

    const productReferences = products.map((p) => p.reference);

    const referenceIndex = _.indexBy(products, "reference");
    // filter out falsy item.references from client
    const refdiff = _.difference(productReferences, itemReferences);
    if (refdiff.length > 0) {
        return res
            .status(400)
            .json({ error: "Product reference was not found" });
    }

    const adaptedItems = items
        .map((i) => {
            const taxRate = 0;
            const ref = referenceIndex[i.reference];
            const clamp = createClamp(0, ref.stock - ref.count);
            const quantity = clamp(i.quantity);
            const netTotalAmount = quantity * ref.price;
            return {
                ...i,
                unitPrice: ref.price,
                quantity,
                unit: "pcs",
                taxRate,
                taxAmount: netTotalAmount * (taxRate / 100),
                grossTotalAmount: netTotalAmount * (1 + taxRate / 100),
                netTotalAmount,
            };
        })
        .filter((i) => i.quantity !== 0);

    // sum up totalAmount
    const amount = adaptedItems.reduce(
        (acc, it) => acc + it.grossTotalAmount,
        0
    );
    const currency = "SEK";
    const reference = `${eventRef}-${nanoid(6)}`;

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
        webhooks: [
            createWebhook("created"),
            createWebhook("charged.failed"),
            createWebhook("checkout.completed"),
        ],
    });

    // creating order in backend
    await strapi.post("/orders", {
        customerData: {
            firstName: body.checkout.consumer?.privatePerson?.firstName,
            lastName: body.checkout.consumer?.privatePerson?.lastName,
            phoneNumber: body.checkout.consumer?.phoneNumber,
            email: body.checkout.consumer?.email,
        },
        options,
        order: body.order,
        errors: [],
        status: isFree(body) ? "completed" : "created",
    });

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
    return netsData.data;
};

export default create;
