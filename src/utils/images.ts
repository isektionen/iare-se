/*@ts-ignore*/

export const imageSource = (remote: any, local: string) => {
    if (remote && remote.url) {
        return process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL + remote.url;
    }
    return local;
};

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
