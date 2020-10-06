import { useState, useEffect, useMemo } from "react";
import PublicIp from "public-ip";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  listSupportedCountries as listSupportedCountriesGQL,
  getLocation as getLocationGQL,
  getLatestBigMacIndex as getLtsBigMacIdxGQL,
} from "graphQL/query";
import { chooseRandomValueFromArray as chooseCountry } from "helpers";

/**
 * Resolves the clients current public IP Address.
 * This hook also saves the current ip to local storage,
 * allowing for the possiblilty of offline use.
 */
export const useIPAddress = () => {
  const localStorageKey = "lastIpv4";
  const [ipv4, setIpv4] = useState();
  const [error, setError] = useState(null);
  const [previousIpv4] = useState(localStorage.getItem(localStorageKey));
  const isLoading = !ipv4 && !error;

  useEffect(() => {
    if (!ipv4 && !error) {
      PublicIp.v4()
        .then((v) => {
          setIpv4(v);
          localStorage.setItem(localStorageKey, v);
        })
        .catch((e) => setError(e));
    }
  }, [error, ipv4]);

  return [ipv4, isLoading, error, previousIpv4];
};

/**
 *
 * @param {*} ipv4 - ip address to resolve location information for
 */
export const useLocation = (ipv4) => {
  const [ip, setIpv4] = useState(ipv4);
  // GraphQl hook to request location from ip-vigilante
  // Uses persisted cache, if possible
  const [getLocal, { data, loading, error }] = useLazyQuery(getLocationGQL);

  useEffect(() => {
    // Query new loaction when client ip changes
    if (ip && getLocal) getLocal({ variables: { ip } });
  }, [ip, getLocal]);

  // console.log(ip, data, loading, error);

  const { getLocation } = data || { getLocation: {} };
  return [getLocation, setIpv4, loading, error];
};

/**
 *
 */
export const useSupportedCountries = () => {
  const { data } = useQuery(listSupportedCountriesGQL);
  const {
    listSupportedCountries: { countries },
  } = data || { listSupportedCountries: { countries: null } };

  return countries;
};

/**
 *
 * @param {*} excludeList
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
    // Run GraphQL query on each update of country
    if (country) getIndex({ variables: { country } });
  }, [country, getIndex]);

  useEffect(() => {
    // Set bigMacIndex after lookup
    const { getLatestBigMacIndex } = data || {};
    if (getLatestBigMacIndex) setIndex({ ...getLatestBigMacIndex });
  }, [data, getIndex]);

  return [bigMacIndex, setCountry, loading, error];
};
