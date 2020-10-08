import React from "react";
import { Results, Loading } from "./components";
import { useCalcState } from "./state";

const BigMacCalculator = (props) => {
  // Reacts to clients location to provide all of BigMacCalculator's state
  const {
    localIndex,
    randomIndex,
    ipLookUpError,
    previousIpv4,
  } = useCalcState();
  // Parsing out relevant data current country's big mac index
  const {
    country: localCountry,
    localPrice,
    dollarPrice,
    dollarPPP,
  } = localIndex;
  // Parsing out relevant data from random country's big mac index
  const {
    country: randomCountry,
    dollarPrice: dollarPriceRandom,
  } = randomIndex;

  if (ipLookUpError) {
    // In production we could handle more elegantly the various state errors
    // that useCalState could return.
    console.warn(
      "Couldn't get your current location, defaults to last known",
      previousIpv4
    );
  }

  // Maintain a loading state until we have the minimum data neccessary
  const isLoading =
    !localCountry ||
    !localPrice ||
    !dollarPrice ||
    !dollarPPP ||
    !dollarPriceRandom ||
    !randomCountry;

  return isLoading ? (
    <Loading message={"Finding your location..." + previousIpv4} />
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
BigMacCalculator.propTypes = {};

export default BigMacCalculator;
