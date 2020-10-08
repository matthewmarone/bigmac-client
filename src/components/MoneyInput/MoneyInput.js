import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Input, InputAdornment } from "@material-ui/core";

/**
 * Use Material UI input under the hood.  In the future this could be
 * improved to dsiplay amount in the local currency.
 * @param {*} props
 */
const MoneyInput = (props) => {
  const { id, color = "secondary", autoFocus, amount, onChange } = props;
  const handleChange = useCallback(
    (e) => {
      // Convert back to number
      onChange(parseFloat(e.target.value));
    },
    [onChange]
  );
  return (
    <Input
      id={id}
      data-testid="component-MoneyInput"
      type="number"
      color={color}
      autoFocus={autoFocus}
      value={"" + amount}
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
