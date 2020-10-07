import { useEffect } from "react";
import {
  useIPAddress,
  useLocation,
  useRandomCountry,
  useCountryBigMacIdx,
} from "hooks";

/**
 * This hook reacts to changes in user location to produce the clients
 * local big mac index, and then chooses another country at random,
 * returning that random country's current big mac index.  Any errors
 * along the way are also returned.
 *
 */
export const useCalcState = () => {
  // Looks up clents public ipv4, returns cached ip immediately
  const [ipv4, , ipError, previousIpv4] = useIPAddress();
  // Querries bigmac-server (ip-vigilante), or locally persisted cache if availble
  const [{ country: localCountry }, setIpv4, , lErr] = useLocation(
    previousIpv4
  );
  // Hook to choose a random country, excluding the clients current
  const [randomCountry, setExcludeList] = useRandomCountry([localCountry]);
  // Querries bigmac-server, or persisted cache, to look up countries pricing
  // and exchange rates
  const [localIndex, setLocalIdxCountry, , lIndexErr] = useCountryBigMacIdx(
    localCountry
  );
  // Like above, but for the newly choosen random country
  const [randomIndex, setRandomIdxCountry, , rIndexErr] = useCountryBigMacIdx(
    randomCountry
  );

  // This effect runs when the clients ip address changes or becomes known
  useEffect(() => {
    // Update the useLocation hook
    if (ipv4 || previousIpv4) setIpv4(ipv4 || previousIpv4);
  }, [ipv4, previousIpv4, setIpv4]);

  // Runs when the useLocation hook returns a location
  useEffect(() => {
    if (localCountry) {
      // Update useRandomCountry
      setExcludeList([localCountry]);
      // update useCountryBigMacIndex for local country
      setLocalIdxCountry(localCountry);
    }
  }, [localCountry, setExcludeList, setLocalIdxCountry]);

  // Runs each time a random country is choosen
  useEffect(() => {
    if (randomCountry) {
      // update useCountryBigMacIndex for the random country
      setRandomIdxCountry(randomCountry);
    }
  }, [randomCountry, setRandomIdxCountry]);

  if (ipError || lErr || lIndexErr || rIndexErr)
    console.warn(ipError, lErr, lIndexErr, rIndexErr);

  // Return all states and let the component decide how to display
  return {
    localIndex,
    randomIndex,
    ipv4,
    previousIpv4,
    localCountry,
    randomCountry,
    ipLookUpError: ipError,
    locationLookUpError: lErr,
    localCountryIndexError: lIndexErr,
    randomCountryIndexError: rIndexErr,
  };
};
