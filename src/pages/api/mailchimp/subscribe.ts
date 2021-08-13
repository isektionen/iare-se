import type { NextApiRequest, NextApiResponse } from "next";
import { mailchimp, status } from "lib/mailchimp";
import { Kottnet } from "lib/kottnet";
import { AddListMemberBody } from "@mailchimp/mailchimp_marketing";

const getIdentity = async (email: string) => {
    const [identity, provider] = email.split("@");
    if (provider.includes("kth.se")) {
        const url = Kottnet`/${identity}`;
        const result = await fetch(url);
        if (result.ok) {
            const { name } = (await result.json()) as { name: string };
            const [fName, lName] = name.split(" ", 1);
            return { fromKTH: true, fName, lName };
        }
    }
    return { fromKTH: false, fName: undefined, lName: undefined };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const newsletter = process.env.MAILCHIMP_AUDIENCE_ID as string;

    const { email } = req.body as { email: string };

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const { fromKTH, fName, lName } = await getIdentity(email);

    try {
        let body = {
            email_address: email,
            status: "subscribed",
        } as AddListMemberBody;

        if (fromKTH) {
            body = { ...body, merge_fields: { FNAME: fName, LNAME: lName } };
        }

        await mailchimp.lists.addListMember(newsletter, body);

        return res.status(201).json({});
    } catch (error: any) {
        return res
            .status(500)
            .json({ error: error.message || error.toString() });
    }
};

export default handler;
