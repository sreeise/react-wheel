import React from "react";
import Slide from "@material-ui/core/Slide/Slide";

function SlideContainer(props) {
  const slide = props.slide;

  if (slide === undefined) {
    return(
      <div></div>
    )
  }

  return(
    <React.Fragment>
      {slide.map((item, index) => (
        <Slide direction={props.direction}
               className={props.className}
               mountOnEnter
               unmountOnExit
               in={props.in}
               key={index}
               index={index}
               timeout={props.timeout}>
          {item}
        </Slide>
      ))}
    </React.Fragment>
  )
}

export default SlideContainer;