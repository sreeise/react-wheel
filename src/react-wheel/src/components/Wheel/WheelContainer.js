import GridContainer from "./GridContainer";
import React from "react";
import Mapper from "./Mapper";

// Implements the wrappers for the flex box and arrows
function WheelContainer(props) {
  return (
    <Mapper>
      <GridContainer
        spacing={props.spacing}
        next={props.next}
        previous={props.previous}
        theme={props.theme}
        in={props.in}
        arrows={props.arrows}
      >
        {props.children}
      </GridContainer>
    </Mapper>
  );
}

export default WheelContainer;
