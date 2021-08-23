import { axios, Strapi } from "lib/strapi";
import { NextApiRequest, NextApiResponse } from "next";

interface IBody {
    fullname: string;
    email: string;
    message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { fullname, email, message } = req.body as IBody;

    if (!fullname || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        await axios.post(Strapi`/remote-services/send/2`, {
            to: email,
            fullname,
            message,
        });
        await axios.post(Strapi`/remote-services/send/4`, {
            to: process.env.CONTACT_RECIPIENT,
            fullname,
            email,
            message,
        });
        return res.status(200).json({ status: "ok" });
    } catch (error) {
        return res.status(500).json({ error: "something unexpected happend" });
    }
};

export default handler;
