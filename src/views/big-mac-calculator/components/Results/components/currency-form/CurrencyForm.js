import React from "react";
import PropTypes from "prop-types";
import { Typography, FormControl, InputLabel } from "@material-ui/core";
import { MoneyInput } from "components";

/**
 *
 * @param {*} props
 */
const CurrencyForm = (props) => {
  const {
    country,
    onAmountChange,
    amount,
    autoFocus = true,
    align = "inherit",
  } = props;

  return (
    <div>
      <Typography color="primary" align={align}>
        You are in {country}! That's a fantastic place.
      </Typography>
      <Typography color="primary" align={align}>
        How much money in {country}'s currency do you have?
      </Typography>
      <FormControl variant="filled">
        <InputLabel htmlFor="amountInput" color="secondary">
          Amount
        </InputLabel>
        {/* MoneyInput should be imporoved to formate based on country */}
        {/* and handle decimals better. Ex: 25.5 would display 25.50 */}
        <MoneyInput
          id="amountInput"
          color="secondary"
          autoFocus={autoFocus}
          amount={amount}
          onChange={onAmountChange}
          country={country}
        />
      </FormControl>
    </div>
  );
};
CurrencyForm.propTypes = {
  country: PropTypes.string.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  autoFocus: PropTypes.bool,
  align: PropTypes.string,
};

export default CurrencyForm;
