import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import baseAxios from "axios";

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_STRAPI_GQL,
    cache: new InMemoryCache(),
});

const axios = baseAxios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL,
});

const strapi = client;

export default strapi;

export { gql, axios };
