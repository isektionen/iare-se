import strapi, { axios } from "lib/strapi";

export const validatePath = (
    knownPaths: string[] = [],
    params: NodeJS.Dict<string | string[]> | undefined
) => knownPaths.includes(Object.values(params as Object).join("/"));

export const makeFetcher = (document: string) => {
    switch (document) {
        case "dokument":
            return axios;
        case "document":
            return axios;
        default:
            return strapi;
    }
};

export const isExternal = (href: string) =>
    /https?:\/\/.+|mailto:.+$|tel:.+/i.test(href);
