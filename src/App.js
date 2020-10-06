import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { listLatestBigMacIndex as listLatestBigMacIndexGQL } from "graphQL/query";
import { writeSupportedCountriesToCatch } from "helpers";
import { Header, Footer } from "components";
import { BigMacCalculator } from "views";

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
        <Header />
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
        <Footer />
      </Container>
    </div>
  );
}

export default App;
