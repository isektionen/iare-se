import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";

export const client = new ApolloClient({
    uri: process.env.NEXT_STRAPI_BACKEND_URL || "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
});

export const getPathOf = async (pagePath: string) => {
    const { data, error } = await client.query({
        query: gql`
            query {
                ${pagePath}s {
                    slug
                }
            }
        `,
    });
    if (!error) {
        return data.events.map((event: { slug: string }) => {
            return {
                params: {
                    slug: event.slug,
                },
            };
        });
    }
};

export { gql };
