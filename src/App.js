import React, { useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BigMacCalculator } from "views";
import { useQuery } from "@apollo/client";
import { listLatestBigMacIndex as listLatestBigMacIndexGQL } from "graphQL/query";
import { writeSupportedCountriesToCatch } from "helpers";

const useStyles = makeStyles({
  main: {
    height: "100%",
  },
});

function App() {
  const classes = useStyles();
  // Hydrates/refreshes the persisted cache with server data
  const { data, client } = useQuery(listLatestBigMacIndexGQL, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    // Saves the supported countries to catch in it's on query
    if (data && client) writeSupportedCountriesToCatch(data, client);
  }, [client, data]);

  return (
    <div className="App">
      <Container className="App-header" component="header" maxWidth="xl">
        <Typography component="h1" variant="h5" color="secondary">
          The Big Mac Test
        </Typography>
      </Container>
      <Container
        className="App-main"
        component="main"
        maxWidth="sm"
        classes={{ root: classes.main }}
      >
        <BigMacCalculator />
      </Container>
      <Container className="App-footer" component="footer" maxWidth="xl">
        &#169; 2020 Conversion Logix Inc. All rights reserved.
      </Container>
    </div>
  );
}

export default App;
