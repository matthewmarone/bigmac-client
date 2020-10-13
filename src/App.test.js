import React from "react";
import { render } from "@testing-library/react";
// import { toBeVisible, toHaveTextContent } from "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import { listLatestBigMacIndex } from "graphQL/query";
import App from "./App";
import AppContext from "AppContext";

// Mocks no data being returned from the GraphQL server,
// since we are testing the very initial load state.
const mocks = [
  {
    request: {
      query: listLatestBigMacIndex,
      variables: {},
    },
    result: {
      data: null,
    },
  },
];

test("The initial state of the app loads without crashing", () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppContext>
        <App />
      </AppContext>
    </MockedProvider>
  );
  expect(getByTestId("app-Header")).toBeVisible();
  expect(getByTestId("app-Header")).toHaveTextContent("The Big Mac Test");
  expect(getByTestId("app-Main")).toBeVisible();
  expect(getByTestId("app-Main")).toHaveTextContent("Finding your location...");
  expect(getByTestId("app-Footer")).toBeVisible();
  expect(getByTestId("app-Footer")).toHaveTextContent(
    "© 2020 Conversion Logix Inc. All rights reserved."
  );
  // debug();
});
