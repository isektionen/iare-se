import { axios, Strapi } from "lib/strapi";
import { NextApiRequest, NextApiResponse } from "next";

interface IBody {
    emotion: string;
    publishable: boolean;
    content: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { emotion, publishable, content } = req.body as IBody;

    if (!emotion || publishable === undefined || !content) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const result = await axios.post(Strapi`/feedbacks`, {
            emotion,
            publishable,
            content,
            published_at: null,
        });
        return res.status(201).json({});
    } catch (error) {
        return res.status(500).json({ error: "something unexpected happend" });
    }
};

export default handler;
