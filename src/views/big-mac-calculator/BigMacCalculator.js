import React, { useEffect } from "react";
import { Results, Loading } from "./components";
import {
  useIPAddress,
  useLocation,
  useRandomCountry,
  useCountryBigMacIdx,
} from "hooks";

const useCalcState = () => {
  const [ipv4, , ipError, previousIpv4] = useIPAddress();
  const [{ country: localCountry }, setIpv4] = useLocation(previousIpv4);
  const [randomCountry, setExcludeList] = useRandomCountry([localCountry]);
  const [localIndex, setLocalIdxCountry] = useCountryBigMacIdx(localCountry);
  const [randomIndex, setRandomIdxCountry] = useCountryBigMacIdx(randomCountry);

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
    ipv4,
    ipError,
    previousIpv4,
    localCountry,
    randomCountry,
    localIndex,
    randomIndex,
  };
};

const BigMacCalculator = (props) => {
  const { ipError, localIndex, randomIndex } = useCalcState();
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

  if (ipError)
    console.warn(
      "Couldn't get your current location, defaults to last known",
      ipError
    );

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
