import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { CurrencyForm, LocalResults, RandomResults } from "./components";
import {
  getHowManyCanYouBuy,
  getHowManyYouCouldBuyInForiegnCountry,
  getRealitiveWorthAbroad,
} from "helpers";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
});

/**
 *
 * @param {*} props
 */
const Results = (props) => {
  const classes = useStyles();
  // Store users currency input
  const [localAmount, setLocalAmount] = useState(0);
  // Callback to handle currency input change
  const handleLocalAmountChange = useCallback((amt) => {
    // Only allow positive currency input
    setLocalAmount(!isNaN(amt) && amt > 0 ? amt : 0);
  }, []);
  const {
    localCountry,
    localPrice,
    dollarPrice,
    dollarPPP,
    dollarPriceRandom,
    randomCountry,
  } = props; // All these props are required as specified by PropTypes

  // Calc the number of big macs that can be bought in the current country
  const localNumberOfBigMacs = getHowManyCanYouBuy(localPrice, localAmount);

  // Calc the number of big macs that can be bought in a random country
  const randomNumberOfBigMacs = getHowManyYouCouldBuyInForiegnCountry(
    localAmount,
    localPrice,
    dollarPrice,
    dollarPriceRandom
  );

  // Cacl what the users local amount would "feel like" in the random country
  // based on the difference in the U.S. dollar price of the Big Mac between the
  // two countries
  const randomConvertedAmount = getRealitiveWorthAbroad(
    localAmount,
    dollarPrice,
    dollarPriceRandom
  );

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
        {/* Display's top third of page */}
        <CurrencyForm
          country={localCountry}
          amount={localAmount}
          onAmountChange={handleLocalAmountChange}
        />
      </Grid>
      <Grid item xs={12}>
        {/* Display in middle of page only after user inputs amount */}
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
        {/* Display in bottom 3rd of page only after user inputs amount */}
        {localAmount === 0 ? (
          ""
        ) : (
          <RandomResults
            country={randomCountry}
            localCountry={localCountry}
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

export default Results;
