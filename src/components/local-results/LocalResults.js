import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

/**
 *
 * @param {*} props
 */
const LocalResults = (props) => {
  const { country, numOfBigMac, dollarPPP, align = "inherit" } = props;
  return (
    <div>
      <Typography color="primary" align={align}>
        Awesome! You could buy {numOfBigMac} Big Macs in {country}.
      </Typography>
      <Typography color="primary" align={align}>
        Your Dollar Purchasing Parity (PPP) is {dollarPPP}.
      </Typography>
    </div>
  );
};
LocalResults.propTypes = {
  country: PropTypes.string.isRequired,
  numOfBigMac: PropTypes.number.isRequired,
  dollarPPP: PropTypes.number.isRequired,
  align: PropTypes.string,
};

export default LocalResults;
