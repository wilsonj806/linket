import React from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

export const endpoint =
  process.env.NODE_ENV === "production"
    ? ""
    : "http://localhost:3000/api/graphql";

function CustomApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: endpoint,
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default CustomApp;
