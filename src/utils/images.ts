export const imageSource = (remote: any, local: string) => {
    if (remote && remote.url) {
        return process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL + remote.url;
    }
    return local;
};
