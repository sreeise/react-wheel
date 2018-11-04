import styled from "styled-components";

function slideTransform(slideLength, sliding, direction) {
  if (!sliding) {
    return "translateX(-0.5px)";
  }
  if (sliding && direction === "prev") {
    return "translateX(-100%)";
  } else if (sliding && direction === "next") {
    return "translateX(100%)";
  } else if (!sliding && direction === "prev") {
    return "translateX(calc(2 * (-20% - 30px)))";
  } else if (!sliding && direction === "next") {
    return "translateX(calc(-10% + 30px))";
  }
}

const FlexContainer = styled.div`
  display: flex;
  overflow: hidden;
  padding: 0;
  margin: 0;
  transition: ${props =>
    props.sliding
      ? "transition: 1.2s all ease-in-out"
      : "transform 1s ease-in-out"};
  transform: ${props =>
    slideTransform(props.slideLength, props.sliding, props.direction)};
`;
export default FlexContainer;
