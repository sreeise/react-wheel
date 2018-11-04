import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import ChevronRight from "@material-ui/icons/ChevronRight";
import darkTheme from "../theme/dark.jsx";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  arrow: {
    maxWidth: "100%"
  }
});

function RightArrow(props) {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={darkTheme}>
      <Button className={classes.arrow}
        disabled={props.disabled}
        onClick={props.onClick}>
        <ChevronRight/>
      </Button>
    </MuiThemeProvider>
  );
}

RightArrow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RightArrow);
