import strapi, { axios } from "lib/strapi";

export const validatePath = (
    knownPaths: string[] = [],
    params: NodeJS.Dict<string | string[]> | undefined
) => knownPaths.includes(Object.values(params as Object).join("/"));

export const isExternal = (href: string) =>
    /https?:\/\/.+|mailto:.+$|tel:.+/i.test(href);
