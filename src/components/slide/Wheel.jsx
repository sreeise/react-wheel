import React, {Children, cloneElement} from "react";
import Wrapper from "../utils/wrapper";
import WheelContainer from "../utils/container";
import CarouselSlot from "../utils/slide";
import GridContainer from "./GridContainer";

class Wheel extends React.Component {
  constructor(props) {
    super(props);
  }


  wrapSlideProps() {
    const {children} = this.props;
    return Children.map(children,
      (child) => cloneElement(child,
        {
          numSlides: children.length || 1
        }
      ))
  }

  render() {
    const childrenWithProps = this.wrapSlideProps();

    return(
      <GridContainer>
        <Wrapper>
          <WheelContainer
            sliding={sliding}
            direction={direction}
            numSlides={childrenWithProps.length}
          >
            {childrenWithProps.map((child, index) => (
              <CarouselSlot
                key={index}
                order={this.getOrder(index)}
                numSlides={childrenWithProps.length}
                position={position}
              >
                {child}
              </CarouselSlot>
            ))}
          </WheelContainer>
        </Wrapper>
      </GridContainer>
    )
  }
}

export default Wheel;

/*
          <Wrapper>
            <WheelContainer
              sliding={sliding}
              direction={direction}
              numSlides={childrenWithProps.length}
            >
              {childrenWithProps.map((child, index) => (
                <CarouselSlot
                  key={index}
                  order={this.getOrder(index)}
                  numSlides={childrenWithProps.length}
                  position={position}
                >
                  {child}
                </CarouselSlot>
              ))}
            </WheelContainer>
          </Wrapper>
 */
