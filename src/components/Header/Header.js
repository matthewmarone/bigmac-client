import React from "react";
import { Typography } from "@material-ui/core";

/**
 *
 * @param {*} props
 */
const Header = (props) => {
  return (
    <Typography component="h1" variant="h5" color="secondary">
      The Big Mac Test
    </Typography>
  );
};

export default Header;
