import React from "react";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

export const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://wjlinket.herokuapp.com/api/graphql"
    : "http://localhost:3000/api/graphql";

// Apollo Client config
const cache = new InMemoryCache();
const link = createHttpLink({ uri: endpoint });

export const client = new ApolloClient({
  link,
  cache,
});

function CustomApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default CustomApp;
