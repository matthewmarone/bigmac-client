import React, { useState, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CurrencyForm, LocalResults, RandomResults } from "components";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
});

const BigMacCalculator = () => {
  const classes = useStyles();
  const localCountry = "Peru";
  const [localAmount, setLocalAmount] = useState(0);
  const localNumberOfBigMacs = 20;
  const localDollarPPP = 3;
  const randomCountry = "The United State of America";
  const randomConvertedAmount = 55;
  const randomNumberOfBigMacs = 75;

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
        <LocalResults
          country={localCountry}
          numOfBigMac={localNumberOfBigMacs}
          dollarPPP={localDollarPPP}
        />
      </Grid>
      <Grid item xs={12}>
        <RandomResults
          country={randomCountry}
          amount={localAmount}
          amountConverted={randomConvertedAmount}
          numberOfBigMacs={randomNumberOfBigMacs}
        />
      </Grid>
    </Grid>
  );
};

export default BigMacCalculator;
