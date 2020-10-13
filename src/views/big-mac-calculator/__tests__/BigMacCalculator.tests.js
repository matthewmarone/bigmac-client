import React from "react";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import BigMacCalculator from "./../BigMacCalculator";
import { MockedProvider } from "@apollo/client/testing";
import {
  listSupportedCountries,
  getLatestBigMacIndex,
  getLocation,
} from "graphQL/query";
import { Context } from "AppContext";

test("BigMacCalculator's transition from displaying Loading to displaying Results", async () => {
  await act(async () => {
    const { getByText, getByTestId } = render(
      // Mock provider provides test responses from the server
      <MockedProvider mocks={mocks} addTypename={false}>
        <Context.Provider
          value={[
            // Setting the apps state to an ip address the mock responses will understand
            {
              ipV4: "148.102.115.175",
              previousIpv4: "148.102.115.175",
              ipLookUpError: null,
            },
          ]}
        >
          <BigMacCalculator />
        </Context.Provider>
      </MockedProvider>
    );

    const findingTxt = "Finding your location...";
    expect(getByText(findingTxt)).toBeVisible();
    await waitForElementToBeRemoved(() => getByText(findingTxt));
    expect(() => getByText(findingTxt)).toThrow("Unable to find an element");
    expect(getByTestId("component-MoneyInput")).toBeVisible();
  });
});

// Mocks the necessary GraphQL responses
const mocks = [
  {
    request: {
      query: listSupportedCountries,
      variables: {},
    },
    result: {
      data: {
        listSupportedCountries: {
          id: "LATEST",
          countries: ["Argentina", "Australia"],
        },
      },
    },
  },
  {
    request: {
      query: getLocation,
      variables: { ip: "148.102.115.175" },
    },
    result: {
      data: {
        getLocation: {
          id: "148.102.115.175", // Not a real ip for Argentina
          country: "Argentina",
          city: "Not a real city",
        },
      },
    },
  },
  {
    request: {
      query: getLatestBigMacIndex,
      variables: { country: "Argentina" },
    },
    result: {
      data: {
        getLatestBigMacIndex: {
          id: "Argentina#LATEST",
          country: "Argentina",
          date: 1451624400,
          localPrice: 33,
          dollarExchange: 13.80925,
          dollarPrice: 2.389702554,
          dollarPPP: 6.693711968,
          dollarValuation: -51.52733155,
        },
      },
    },
  },
  {
    request: {
      query: getLatestBigMacIndex,
      variables: { country: "Australia" },
    },
    result: {
      data: {
        getLatestBigMacIndex: {
          id: "Australia#LATEST",
          country: "Australia",
          date: 1451624400,
          localPrice: 5.3,
          dollarExchange: 1.415728746,
          dollarPrice: 3.743655,
          dollarPPP: 1.07505071,
          dollarValuation: -24.0637931,
        },
      },
    },
  },
];
