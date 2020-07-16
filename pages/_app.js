import React from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

export const endpoint =
  process.env.NODE_ENV === "production"
    ? ""
    : "http://localhost:3000/api/graphql";

export const client = new ApolloClient({
  uri: endpoint,
});

function CustomApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default CustomApp;
