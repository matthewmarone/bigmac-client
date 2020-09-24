import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BigMacCalculator } from "views";
// import './App.css';

const useStyles = makeStyles({
  main: {
    height: "100%",
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <Typography component="h1" variant="h5" color="secondary">
          The Big Mac Test
        </Typography>
      </header>
      <Container
        component="main"
        maxWidth="sm"
        classes={{ root: classes.main }}
      >
        <BigMacCalculator />
      </Container>
      <footer className="App-footer">
        &#169; 2020 Conversion Logix Inc. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
