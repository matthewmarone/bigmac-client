import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";

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

  const handleChange = useCallback((e) => {
    onAmountChange(parseFloat(e.target.value));
  }, [onAmountChange]);

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
        <Input
          id="amountInput"
          type="number"
          color="secondary"
          autoFocus={autoFocus}
          value={amount}
          onChange={handleChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
    </div>
  );
};
CurrencyForm.propTypes = {
  country: PropTypes.string.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  amount: PropTypes.number,
  autoFocus: PropTypes.bool,
  align: PropTypes.string,
};

export default CurrencyForm;
