import { gql } from "@apollo/client";

export const getLocation = gql`
  query getLocation($ip: String!) {
    getLocation(ip: $ip) {
      id
      country
      city
    }
  }
`;
export const getLatestBigMacIndex = gql`
  query getLatestBigMacIndex($country: String!) {
    getLatestBigMacIndex(country: $country) {
      id
      country
      date
      localPrice
      dollarExchange
      dollarPrice
      dollarPPP
      dollarValuation
    }
  }
`;
export const listLatestBigMacIndex = gql`
  query listLatestBigMacIndex {
    listLatestBigMacIndex {
      id
      country
      date
      localPrice
      dollarExchange
      dollarPrice
      dollarPPP
      dollarValuation
    }
  }
`;
export const listSupportedCountries = gql`
  query listSupportedCountries {
    listSupportedCountries {
      id
      countries
    }
  }
`;
