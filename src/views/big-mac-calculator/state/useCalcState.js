import { useEffect } from "react";
import { useLocation, useRandomCountry, useCountryBigMacIdx } from "hooks";

/**
 * This hook reacts to changes in user location to produce the clients
 * local big mac index, and then chooses another country at random,
 * returning that random country's current big mac index.  Any errors
 * along the way are also returned.
 *
 */
export const useCalcState = (ipV4) => {
  // Querries bigmac-server (ip-vigilante), or locally persisted cache if availble
  const [{ country: localCountry }, setIpV4, , lErr] = useLocation(ipV4);
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

  // Log any erros to console
  if (lErr || lIndexErr || rIndexErr) console.warn(lErr, lIndexErr, rIndexErr);

  // Return all states to let the component decide how to display
  // and a way to set a new ipv4 address
  return [
    {
      localIndex,
      randomIndex,
      localCountry,
      randomCountry,
      locationLookUpError: lErr,
      localCountryIndexError: lIndexErr,
      randomCountryIndexError: rIndexErr,
    },
    setIpV4,
  ];
};
