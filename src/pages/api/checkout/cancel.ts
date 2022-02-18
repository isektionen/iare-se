import { axios as strapi } from "lib/strapi";
import { NextApiRequest, NextApiResponse } from "next";
import { createStatus } from "./utils";

const cancel = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(400);
    }

    const { orderReference } = req.body as { orderReference: string };

    await strapi.put(`/orders/${orderReference}`, {
        status: [createStatus("failed")],
    });

    return res.status(201).send({});
};

export default cancel;
