import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import "../styles/index.css";

const client = new ApolloClient({
  uri: "https://city-lists.hasura.app/v1/graphql",
  cache: new InMemoryCache()
});

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
