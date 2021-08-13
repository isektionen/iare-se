/*@ts-ignore*/

import { axios } from "lib/strapi";

interface Props {
    file: string;
    provider?: "aws" | "local";
}

export const imageProvider = ({ file, provider = "local" }: Props) => {
    const strapiMediaProviders = {
        aws: "https://iare-strapi-backend.s3.eu-north-1.amazonaws.com",
        local: "http://localhost:1337",
    };

    return strapiMediaProviders[provider] + file;
};

export const generateQRCode = async (intentionId: string) => {
    const url = `/orders/${intentionId}/ticket`;
    const { data } = await axios.get(url);
    return data;
};
