import GridContainer from "./GridContainer";
import Wrapper from "./wrapper";
import React from "react";
import Mapper from "./Mapper";

// Implements the wrappers for the flex box and arrows
function WheelContainer(props) {
  return (
    <Mapper>
      <GridContainer
        size={props.size}
        spacing={props.spacing}
        next={props.next}
        previous={props.previous}
        theme={props.theme}
        in={props.in}
        arrows={props.arrows}
      >
        <Wrapper>{props.children}</Wrapper>
      </GridContainer>
    </Mapper>
  );
}

export default WheelContainer;
