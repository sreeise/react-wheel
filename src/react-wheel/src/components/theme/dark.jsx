import {createMuiTheme} from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    useNextVariants: true
  }
});

export default darkTheme;
