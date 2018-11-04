import {createMuiTheme} from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: {main: "#11cb5f"}
  },
  typography: {
    useNextVariants: true
  }
});

export default darkTheme;
