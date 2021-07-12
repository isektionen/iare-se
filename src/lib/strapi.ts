import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
export const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_STRAPI_GQL,
    cache: new InMemoryCache(),
});

export default client;

export { gql };
