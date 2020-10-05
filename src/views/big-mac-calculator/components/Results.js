import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { CurrencyForm, LocalResults, RandomResults } from "components";
import { getMaxNumOfGoodsInForiegnCountry, convertFunds } from "helpers";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
});

/**
 *
 * @param {*} props
 */
export const Results = (props) => {
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
