import React from "react";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import Button from "@material-ui/core/Button/Button";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import darkTheme from "../theme/dark";
import lightTheme from "../theme/light";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ArrowUtils from "./arrowUtils";

function LeftArrow(props) {
  const { classes } = props;
  const classNames = ArrowUtils.getHoverClass(classes, props.arrowColor);

  return (
    <MuiThemeProvider theme={props.theme === "dark" ? darkTheme : lightTheme}>
      <Button className={props.arrows === false ? classes.iconDisabled : classNames}
              onMouseOver={props.onMouseOver}
              disabled={props.disabled}
              onClick={props.onClick}>
        <ChevronLeft/>
      </Button>
    </MuiThemeProvider>
  );
}

LeftArrow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftArrow);
