import { useState, useEffect, useMemo } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  listSupportedCountries as listSupportedCountriesGQL,
  getLocation as getLocationGQL,
  getLatestBigMacIndex as getLtsBigMacIdxGQL,
} from "graphQL/query";
import { chooseRandomValueFromArray as chooseCountry } from "helpers";

/**
 * Hook to call getLocation(ip: String!), use cache first
 * @param {*} ipv4 - ip address to resolve location information for
 */
export const useLocation = (ipv4) => {
  const [ip, setIpv4] = useState(ipv4);
  // GraphQl hook to request location from ip-vigilante
  // Uses persisted cache, if possible
  const [getLocal, { data, loading, error }] = useLazyQuery(getLocationGQL);

  useEffect(() => {
    let isMounted = true;
    // Query new loaction when client ip changes
    if (isMounted && ip && getLocal) getLocal({ variables: { ip } });

    return () => (isMounted = false);
  }, [ip, getLocal]);

  // console.log(ip, data, loading, error);

  const { getLocation } = data || { getLocation: {} };
  return [getLocation, setIpv4, loading, error];
};

/**
 * Hook to call listSupportedCountries, uses cache first
 */
export const useSupportedCountries = () => {
  const { data } = useQuery(listSupportedCountriesGQL);
  const {
    listSupportedCountries: { countries },
  } = data || { listSupportedCountries: { countries: null } };

  return countries;
};

/**
 * Hook to choose a country at random, based on countries
 * returned by useSupportedCountries.
 * @param {*} excludeList - array of countries not to return
 * @see useSupportedCountries
 */
export const useRandomCountry = (excludeList = []) => {
  const [exList, setExludeList] = useState(excludeList);
  const countryList = useSupportedCountries();

  const randomCountry = useMemo(() => {
    if (Array.isArray(exList) && Array.isArray(countryList)) {
      let c;
      do {
        c = chooseCountry(countryList);
      } while (exList.includes(c)); // Pick another
      return c;
    } else {
      return null;
    }
  }, [countryList, exList]);

  // console.log(randomCountry);
  return [randomCountry, setExludeList];
};

/**
 *
 * @param {*} _country
 */
export const useCountryBigMacIdx = (_country) => {
  const [country, setCountry] = useState(_country);
  const [bigMacIndex, setIndex] = useState({});
  // GraphQl hook to get big-mac-index data based on a random country
  // Looks up in persisted cache, if possible
  const [getIndex, { data, loading, error }] = useLazyQuery(getLtsBigMacIdxGQL);

  useEffect(() => {
    let isMounted = true;
    // Run GraphQL query on each update of country
    if (isMounted && country) getIndex({ variables: { country } });

    return () => (isMounted = false);
  }, [country, getIndex]);

  useEffect(() => {
    let isMounted = true;
    // Set bigMacIndex after lookup
    const { getLatestBigMacIndex } = data || {};
    if (isMounted && getLatestBigMacIndex)
      setIndex({ ...getLatestBigMacIndex });

    return () => (isMounted = false);
  }, [data, getIndex]);

  return [bigMacIndex, setCountry, loading, error];
};
