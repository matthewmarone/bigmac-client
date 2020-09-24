import { createMuiTheme } from "@material-ui/core";
// import { yellow, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  // palette: {
  //   // primary: {
  //   //   main: yellow.A400,
  //   // },
  //   // secondary: {
  //   //   main: green.A400,
  //   // },
  // },
  typography: {
    h1: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 600,
    },
  },
});

export default theme;
