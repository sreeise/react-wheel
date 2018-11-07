import React from "react";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import Button from "@material-ui/core/Button/Button";
import ChevronRight from "@material-ui/icons/ChevronRight";
import darkTheme from "../theme/dark";
import lightTheme from "../theme/light";
import arrowCSS from "../../css/arrows.module.css";

function RightArrow(props) {
  return (
    <MuiThemeProvider theme={props.theme === "dark" ? darkTheme : lightTheme}>
      <Button className={arrowCSS.arrow}
        disabled={props.disabled}
        onClick={props.onClick}>
        <ChevronRight/>
      </Button>
    </MuiThemeProvider>
  );
}

export default RightArrow;
