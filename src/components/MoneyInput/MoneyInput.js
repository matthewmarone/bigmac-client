import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Input, InputAdornment } from "@material-ui/core";

/**
 * Use Material UI input under the hood.  In the future this could be
 * improved to dsiplay amount in the local currency.
 * @param {*} props
 */
const MoneyInput = (props) => {
  const { id, color = "secondary", autoFocus, amount, onChange } = props;
  const [formattedAmount, setFormatedAmount] = useState();
  const handleChange = useCallback(
    (e) => {
      let { value } = e.target;
      // Check for leading 0, ex: 05.05 should be 5.05
      const [wholeN] = value.split(".");
      if (wholeN && wholeN.length > 1 && wholeN.startsWith("0"))
        value = value.substring(1); // Remove leading 0
      setFormatedAmount(value);
      onChange(parseFloat(value));
    },
    [onChange]
  );

  // Compare numberical amount to formatted Amount, this fixes the issue with
  // the user putting in 5.50, but as a number that would display without 
  // the zero (5.5)
  // eslint-disable-next-line eqeqeq
  const displayValue = amount == formattedAmount ? formattedAmount : amount;

  return (
    <Input
      id={id}
      data-testid="component-MoneyInput"
      type="number"
      color={color}
      autoFocus={autoFocus}
      value={displayValue}
      onChange={handleChange}
      startAdornment={<InputAdornment position="start">$</InputAdornment>}
    />
  );
};
MoneyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  color: PropTypes.string,
  autoFocus: PropTypes.bool,
  country: PropTypes.string,
};

export default MoneyInput;
