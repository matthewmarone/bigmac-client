import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Grid, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CurrencyForm, LocalResults, RandomResults } from "components";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useIPAddress } from "hooks";
import {
  getLocation as getLocationGQL,
  getLatestBigMacIndex as getLatestBigMacIndexGQL,
  listSupportedCountries as listSupportedCountriesGQL,
} from "graphQL/query";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
});

/**
 *
 * @param {*} localAvilableFunds
 * @param {*} localPriceOfGood
 * @param {*} localDollarPrice
 * @param {*} foriegnDollarPrice
 */
const getMaxNumOfGoodsInForiegnCountry = (
  localAvilableFunds,
  localPriceOfGood,
  localDollarPrice,
  foreignDollarPrice
) =>
  Math.floor(
    (localAvilableFunds / localPriceOfGood) *
      (localDollarPrice / foreignDollarPrice)
  );
const convertFunds = (localFunds, localDollarPrice, foreignDollarPrice) =>
  parseFloat((localFunds + localDollarPrice / foreignDollarPrice).toFixed(2));

const chooseRandomVal = (arr) => {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

const useRandomCountry = () => {
  const [country, setCountry] = useState();
  const { data } = useQuery(listSupportedCountriesGQL, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) {
      const {
        listSupportedCountries: { countries },
      } = data;
      setCountry(chooseRandomVal(countries));
    }
  }, [data]);

  // console.log(country);

  return country;
};

const Results = (props) => {
  const classes = useStyles();

  const [localAmount, setLocalAmount] = useState(0);
  const {
    localCountry,
    localPrice,
    dollarPrice,
    dollarPPP,
    dollarPriceRandom,
    randomCountry,
  } = props;

  const localNumberOfBigMacs = Math.floor(localAmount / localPrice);

  const randomNumberOfBigMacs = getMaxNumOfGoodsInForiegnCountry(
    localAmount,
    localPrice,
    dollarPrice,
    dollarPriceRandom
  );

  const randomConvertedAmount = convertFunds(
    localAmount,
    dollarPrice,
    dollarPriceRandom
  );

  const handleLocalAmountChange = useCallback((amt) => {
    setLocalAmount(amt > 0 ? amt : 0);
  }, []);

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="space-evenly"
      alignItems="center"
      classes={{
        root: classes.root,
      }}
    >
      <Grid item xs={12}>
        <CurrencyForm
          country={localCountry}
          amount={localAmount}
          onAmountChange={handleLocalAmountChange}
        />
      </Grid>
      <Grid item xs={12}>
        {localAmount === 0 ? (
          ""
        ) : (
          <LocalResults
            country={localCountry}
            numOfBigMac={localNumberOfBigMacs}
            dollarPPP={dollarPPP}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        {localAmount === 0 ? (
          ""
        ) : (
          <RandomResults
            country={randomCountry}
            amount={localAmount}
            amountConverted={randomConvertedAmount}
            numberOfBigMacs={randomNumberOfBigMacs}
          />
        )}
      </Grid>
    </Grid>
  );
};
Results.propTypes = {
  localCountry: PropTypes.string.isRequired,
  localPrice: PropTypes.number.isRequired,
  dollarPrice: PropTypes.number.isRequired,
  dollarPPP: PropTypes.number.isRequired,
  randomCountry: PropTypes.string.isRequired,
  dollarPriceRandom: PropTypes.number.isRequired,
};

const Loading = (props) => {
  const classes = useStyles();
  const { message } = props;
  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="space-evenly"
      alignItems="center"
      classes={{
        root: classes.root,
      }}
    >
      <Grid item xs={12}>
        <LinearProgress />
        <Typography color="secondary" align="center">
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
};
Loading.propTypes = {
  message: PropTypes.string,
};

const BigMacCalculator = (props) => {
  const { ipv4, previousIpv4, error } = useIPAddress();
  const randomCountry = useRandomCountry();
  const [getLocation, { data: currentLocation }] = useLazyQuery(getLocationGQL);
  const [getLatestBigMacIndex, { data: bigMacIdx }] = useLazyQuery(
    getLatestBigMacIndexGQL
  );
  const [
    getLatestBigMacIndex_random,
    { data: bigMacIdx_random },
  ] = useLazyQuery(getLatestBigMacIndexGQL);

  // console.log(bigMacIdx);

  const {
    getLocation: { country: localCountry },
  } = currentLocation || { getLocation: {} };

  const {
    getLatestBigMacIndex: { localPrice, dollarPrice, dollarPPP },
  } = bigMacIdx || { getLatestBigMacIndex: {} };

  const {
    getLatestBigMacIndex: { dollarPrice: dollarPrice_random },
  } = bigMacIdx_random || { getLatestBigMacIndex: {} };

  useEffect(() => {
    if (ipv4 || previousIpv4)
      getLocation({ variables: { ip: ipv4 || previousIpv4 } });
  }, [getLocation, ipv4, previousIpv4]);

  useEffect(() => {
    if (localCountry)
      getLatestBigMacIndex({ variables: { country: localCountry } });
  }, [getLatestBigMacIndex, localCountry]);

  useEffect(() => {
    if (randomCountry)
      getLatestBigMacIndex_random({ variables: { country: randomCountry } });
  }, [getLatestBigMacIndex_random, randomCountry]);

  if (error)
    console.warn(
      "Couldn't get your current location, defaults to last known",
      error
    );

  const isLoading =
    !localCountry ||
    !localPrice ||
    !dollarPrice ||
    !dollarPPP ||
    !dollarPrice_random ||
    !randomCountry;

  return isLoading ? (
    <Loading message="Finding your location..." />
  ) : (
    <Results
      localCountry={localCountry}
      localPrice={localPrice}
      dollarPrice={dollarPrice}
      dollarPPP={dollarPPP}
      dollarPriceRandom={dollarPrice_random}
      randomCountry={randomCountry}
    />
  );
};

export default BigMacCalculator;
