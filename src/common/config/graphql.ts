import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createUploadLink } from "apollo-upload-client";

const graphqlUrl = process.env.GRAPHQL_URL || process.env.REACT_APP_GRAPHQL_URL;

const propertyApiLink = createUploadLink({
  uri: `${graphqlUrl}/graphql`,
  credentials: "include",
  headers: {
    "Access-Control-Allow-Origin": "*",
    crossdomain: true,
  },
});

export const propertyApi = new ApolloClient({
  ssrMode: true,
  link: propertyApiLink as any,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
