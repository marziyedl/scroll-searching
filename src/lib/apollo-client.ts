import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://ddapi.prod.dietdoctor.com/v1",
    cache: new InMemoryCache(),
});

export default client;