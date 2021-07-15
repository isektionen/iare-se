export const imageSource = (remote: string, local: string) => {
    if (remote) {
        return process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL + remote;
    }
    return local;
};
