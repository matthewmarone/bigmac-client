import React, { useEffect, useContext } from "react";
import { Context } from "AppContext";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { listLatestBigMacIndex as listLatestBigMacIndexGQL } from "graphQL/query";
import { writeSupportedCountriesToCatch } from "helpers";
import { Header, Footer } from "components";
import { BigMacCalculator } from "views";
import { useIPAddress } from "hooks";

const useStyles = makeStyles({
  main: {
    height: "100%",
  },
});

function App() {
  const classes = useStyles();
  const [, dispatch] = useContext(Context);
  // Get the users current IP and save in the App's context
  // Hook returns cached ip (priviousIpv4) immediately, if avail.
  const [ipV4, , ipError, previousIpv4] = useIPAddress();
  // Hydrates/refreshes the persisted cache with server data
  const { data, client } = useQuery(listLatestBigMacIndexGQL, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    // Saves the supported countries to catch in it's on query
    if (data && client) writeSupportedCountriesToCatch(data, client);
  }, [client, data]);

  useEffect(() => {
    // Update the part of the AppContext that stores ip info for the client
    dispatch({
      type: "SET_IP",
      payload: { ipV4, previousIpv4, ipLookUpError: ipError },
    });
  }, [dispatch, ipError, ipV4, previousIpv4]);

  return (
    <div className="App">
      <Container
        className="App-header"
        component="header"
        maxWidth="xl"
        data-testid="app-Header"
      >
        <Header />
      </Container>
      <Container
        className="App-main"
        component="main"
        maxWidth="sm"
        classes={{ root: classes.main }}
        data-testid="app-Main"
      >
        <BigMacCalculator />
      </Container>
      <Container
        className="App-footer"
        component="footer"
        maxWidth="xl"
        data-testid="app-Footer"
      >
        <Footer />
      </Container>
    </div>
  );
}

export default App;
