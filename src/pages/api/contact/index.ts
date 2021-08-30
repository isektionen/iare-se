import { axios, Strapi } from "lib/strapi";
import { NextApiRequest, NextApiResponse } from "next";

interface IBody {
    to: string;
    from: string;
    subject: string;
    body: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { to, from, subject, body } = req.body as IBody;

    if ([to, from, subject, body].some((p) => p === undefined)) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        await axios.post(Strapi`/remote-services/relay`, {
            to,
            from,
            subject,
            body,
        });
        return res.status(200).json({ status: "ok" });
    } catch (error) {
        return res.status(500).json({ error: "something unexpected happend" });
    }
};

export default handler;
