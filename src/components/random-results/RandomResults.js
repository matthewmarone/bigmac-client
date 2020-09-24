import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

/**
 *
 * @param {*} props
 */
const RandomResults = (props) => {
  const {
    country,
    numberOfBigMacs,
    amount,
    amountConverted,
    align = "inherit",
  } = props;
  return (
    <div>
      <Typography color="primary" align={align}>
        But if you found yourself in {country}, then you could buy{" "}
        {numberOfBigMacs} Big Macs with your {amount}.
      </Typography>
      <Typography color="primary" align={align}>
        Likewise, your {amount} is worth {amountConverted} in {country}.
      </Typography>
    </div>
  );
};
RandomResults.propTypes = {
  country: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  numberOfBigMacs: PropTypes.number.isRequired,
  amountConverted: PropTypes.number.isRequired,
  align: PropTypes.string,
};

export default RandomResults;
