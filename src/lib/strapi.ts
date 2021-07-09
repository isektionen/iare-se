import {
    ApolloClient,
    DocumentNode,
    gql,
    InMemoryCache,
    useQuery,
} from "@apollo/client";

export const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/graphql`,
    cache: new InMemoryCache(),
});

/*
const wip = <K extends keyof T, T extends object>({
    data,
}: ApolloQueryResult<T>) => {
    const key = Object.keys(data)[0] as K;

    return { [key]: data[key] as unknown as T };

    /*
   return Object.keys(data).reduce((acc, key) => {
       const value = data[key as K]
       return {...acc, [key]: value}
   } , {} as T) 
   
};
*/

const StrapiClient = {
    ...client,
    /*query: async <T>(gql: DocumentNode, variables?: { [x: string]: any }) => {
        const options = { query: gql, variables };
        const { data } = await client.query<T>(options);
        const key = Object.keys(data)[0] as keyof T;
        return { [key]: data[key] as unknown as T };
    },*/
};

export default client;

export { gql };
