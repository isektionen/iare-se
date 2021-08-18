import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import baseAxios from "axios";
import auth from "../../prefetch/static/auth.json";

const Strapi = (
    path: TemplateStringsArray,
    ...variables: (string | number)[]
) => {
    return (
        process.env.NEXT_PUBLIC_STRAPI +
        path.map((p, i) => p + (variables[i] ? variables[i] : "")).join("")
    );
};
const getUri = () => Strapi`/graphql`;

const client = new ApolloClient({
    uri: getUri(),
    cache: new InMemoryCache(),
});

const axios = baseAxios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI,
    headers: {
        Authorization: `Bearer ${auth.token}`,
    },
});

const strapi = client;

export default strapi;

export { gql, axios, Strapi };
