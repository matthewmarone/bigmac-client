import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "theme";
import "fontsource-roboto";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";

(async () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getLatestBigMacIndex(_, { args, toReference }) {
            return toReference({
              __typename: "BigMacIndex",
              id: `${args.country}#LATEST`,
            });
          },
        },
      },
    },
  });

  // await before instantiating ApolloClient,
  // else queries might run before the cache is persisted
  await persistCache({
    cache,
    storage: window.localStorage,
  });
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: cache,
  });

  ReactDOM.render(
    <React.StrictMode>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
