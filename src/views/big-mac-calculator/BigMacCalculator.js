import React, { useContext, useEffect } from "react";
import { Context } from "AppContext";
import { Results, Loading } from "./components";
import { useCalcState } from "./state";

const BigMacCalculator = (props) => {
  // Get the users current IP from the AppContext
  const [appContext] = useContext(Context);
  const { ipV4, previousIpv4, ipLookUpError } = appContext;
  // Reacts to clients ip to provide all of BigMacCalculator's state
  const [{ localIndex, randomIndex }, setIp] = useCalcState(
    ipV4 || previousIpv4
  );

  useEffect(() => {
    // Update useCalcState if IP address changes
    // previousIpv4 will be immediatly availble for returning clients
    if (ipV4 || previousIpv4) setIp(ipV4 || previousIpv4);
  }, [ipV4, previousIpv4, setIp]);

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
    <Loading message={"Finding your location..."} />
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
