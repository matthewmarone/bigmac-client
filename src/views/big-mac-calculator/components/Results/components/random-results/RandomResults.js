import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { formatCurrency } from "helpers";

/**
 *
 * @param {*} props
 */
const RandomResults = (props) => {
  const {
    country,
    localCountry,
    numberOfBigMacs,
    amount,
    amountConverted,
    align = "inherit",
  } = props;

  // Prettify the amount to display in local currency.
  // Note, formatCurrency is under dev and always returns as us dollars.
  const { formatted: amountStr } = formatCurrency(amount, localCountry);
  const { formatted: amountConvertedStr } = formatCurrency(
    amountConverted,
    localCountry
  );
  return (
    <div>
      <Typography color="primary" align={align}>
        But if you found yourself in {country}, then you could buy{" "}
        {numberOfBigMacs} Big Macs with your {amountStr}.
      </Typography>
      <Typography color="primary" align={align}>
        Likewise, your {amountStr} from {localCountry} feels more like{" "}
        {amountConvertedStr} in {country}.
      </Typography>
    </div>
  );
};
RandomResults.propTypes = {
  country: PropTypes.string.isRequired,
  localCountry: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  numberOfBigMacs: PropTypes.number.isRequired,
  amountConverted: PropTypes.number.isRequired,
  align: PropTypes.string,
};

export default RandomResults;
