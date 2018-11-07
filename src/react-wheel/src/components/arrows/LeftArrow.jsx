import React from "react";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import Button from "@material-ui/core/Button/Button";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import darkTheme from "../theme/dark";
import lightTheme from "../theme/light";
import arrowCSS from "../../css/arrows.module.css";

function LeftArrow(props) {
  return (
    <MuiThemeProvider theme={props.theme === "dark" ? darkTheme : lightTheme}>
      <Button className={arrowCSS.arrow}
        disabled={props.disabled}
        onClick={props.onClick}>
        <ChevronLeft/>
      </Button>
    </MuiThemeProvider>
  );
}

export default LeftArrow;
