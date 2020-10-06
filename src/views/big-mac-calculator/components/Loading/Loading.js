import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, LinearProgress, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
});

/**
 *
 * @param {*} props
 */
const Loading = (props) => {
  const classes = useStyles();
  const { message } = props;
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
        <LinearProgress />
        <Typography color="secondary" align="center">
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
};
Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
