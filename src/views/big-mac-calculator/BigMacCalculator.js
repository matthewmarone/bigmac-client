import React, { useEffect } from "react";
import { Results, Loading } from "./components";
import {
  useIPAddress,
  useLocation,
  useRandomCountry,
  useCountryBigMacIdx,
} from "hooks";

/**
 * This hook reacts to changes in user location to produce the clients
 * local big mac index, and then chooses another country at random and
 * also returns that random country's current big mac index.
 *
 */
const useCalcState = () => {
  const [ipv4, , ipError, previousIpv4] = useIPAddress();
  const [{ country: localCountry }, setIpv4, , lErr] = useLocation(
    previousIpv4
  );
  const [randomCountry, setExcludeList] = useRandomCountry([localCountry]);
  const [localIndex, setLocalIdxCountry, , lIndexErr] = useCountryBigMacIdx(
    localCountry
  );
  const [randomIndex, setRandomIdxCountry, , rIndexErr] = useCountryBigMacIdx(
    randomCountry
  );

  // This effect runs when the clients ip address changes or becomes known
  useEffect(() => {
    // Querry for currentCountry on IP address change
    if (ipv4 || previousIpv4) setIpv4(ipv4 || previousIpv4);
  }, [ipv4, previousIpv4, setIpv4]);

  useEffect(() => {
    if (localCountry) {
      setExcludeList([localCountry]);
      setLocalIdxCountry(localCountry);
    }
  }, [localCountry, setExcludeList, setLocalIdxCountry]);

  useEffect(() => {
    if (randomCountry) {
      setRandomIdxCountry(randomCountry);
    }
  }, [randomCountry, setRandomIdxCountry]);

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

const BigMacCalculator = (props) => {
  const {
    localIndex,
    randomIndex,
    ipLookUpError,
    previousIpv4,
  } = useCalcState();
  const {
    country: localCountry,
    localPrice,
    dollarPrice,
    dollarPPP,
  } = localIndex;
  const {
    country: randomCountry,
    dollarPrice: dollarPriceRandom,
  } = randomIndex;

  if (ipLookUpError) {
    // In production we could handle the various errors more elegantly
    console.warn(
      "Couldn't get your current location, defaults to last known",
      previousIpv4
    );
  }

  const isLoading =
    !localCountry ||
    !localPrice ||
    !dollarPrice ||
    !dollarPPP ||
    !dollarPriceRandom ||
    !randomCountry;

  return isLoading ? (
    <Loading message="Finding your location..." />
  ) : (
    <Results
      localCountry={localCountry}
      localPrice={localPrice}
      dollarPrice={dollarPrice}
      dollarPPP={dollarPPP}
      dollarPriceRandom={dollarPriceRandom}
      randomCountry={randomCountry}
    />
  );
};

export default BigMacCalculator;
