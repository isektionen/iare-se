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
        const result = await axios.post(Strapi`/remote-services/mail`, {
            to: email,
            fullname,
            message,
        });
        return res.status(200).json({});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "something unexpected happend" });
    }
};

export default handler;
