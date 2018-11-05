import {createMuiTheme} from "@material-ui/core";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
  typography: {
    useNextVariants: true
  }
});

export default lightTheme;
