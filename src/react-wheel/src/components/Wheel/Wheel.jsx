import React, { Children, cloneElement, Component } from "react";
import WheelContainer from "./WheelContainer";
import FlexContainer from "./FlexContainer";
import styled from "styled-components";

const Slide = styled.div`
  flex: 1 0 100%;
  flex-basis: 8%;
  order: ${props => props.order};
  transition: opacity 2.0s ease-in-out;
`;

// Main implementation of Carousel where
// the slides are sorted properly
class Wheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [],
      currentSlide: [],
      slideLength: 0,
      arrows: true,
      slidesShowing: 0,
      space: 0,
      called: 0,
      currentIndex: 0,
      direction: "",
      position: 0,
      sliding: false,
    };

    this.wrapState = this.wrapState.bind(this);
    this.sortSlides = this.sortSlides.bind(this);
    this.slide = this.slide.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.order = this.order.bind(this);
  }

  componentDidMount() {
    const props = Object.assign({}, this.props);
    this.setState({
      arrows: props.arrows === true,
      slidesShowing: props.slidesShowing === undefined ? 1 : props.slidesShowing,
      space: props.space === undefined ? 8 : props.space,
    });

    let slides = this.wrapState();
    let slidesShowing = this.props.slidesShowing;
    this.sortSlides(slides, slidesShowing).then((array) => {
      this.setState({
        slides: array,
        slideLength: array.length,
        currentSlide: array[0],
      });
    });
  }

  sortSlides(slides, slidesShowing) {
    // Put each slides elements in its own array
    let elementsArray = [];
    return new Promise((resolve) => {
      while (slides.length > 0) {
        let tempArray = [];
        for (let i = 0; i < slidesShowing; i++) {
          const value = slides.shift();
          // Prevents undefined values in the array
          // if the length of the last slide does
          // not meet the slidesShowing amount
          if (value !== undefined) {
            tempArray.push(value);
          }
        }

        elementsArray.push(tempArray);
        tempArray = [];
        tempArray.length = 0;
      }
      resolve(elementsArray);
    });
  }

  wrapState() {
    const { children } = this.props;
    const slideLength = this.props.slidesShowing;
    return Children.map(children, (child) => cloneElement(child,
        { slideLength },
      ));
  }

  order(index) {
    const { position } = this.state;
    const { children } = this.props;
    const slideLength = children.length;

    if (slideLength === 2) {
      return index;
    } else if (index - position < 0) {
      return slideLength - Math.abs(index - position);
    } else {
      return index - position;
    }
  }

  next() {
    if (this.state.currentIndex >= this.state.slides.length - 1) {
      return;
    }
    let slides = this.state.slides;
    let index = this.state.currentIndex + 1;
    let last = slides.length - 1;

    switch (index) {
      case last:
        return this.slide("next", index, slides[last], index);
      default:
        return this.slide("next", index, slides[index], index);
    }
  }

  previous() {
    if (this.state.currentIndex <= 0) {
      return;
    }

    let slides = this.state.slides;
    let index = this.state.currentIndex - 1;

    switch (index) {
      case 0:
        return this.slide("prev", 0, slides[0], 0);
      default:
        return this.slide("prev", index, slides[index], index);
    }
  }

  slide(direction, position, slide, currentIndex) {
    this.setState({
      sliding: true,
      currentIndex,
      direction,
      position,
    });

    setTimeout(() => {
      this.setState({
        sliding: false,
        currentSlide: slide,
      });
    }, 50);
  }

  render() {
    if (this.state.currentSlide !== undefined) {
      let length = this.state.slides.length;
      return (
        <WheelContainer size={this.props.size} spacing={this.props.spacing}
                        next={this.next} previous={this.previous}>
          <FlexContainer sliding={this.state.sliding}
                         direction={this.state.direction}
                         slideLength={length}>
            {this.state.currentSlide.map((item, index) => (
              <Slide slideLength={length} position={this.state.position}
                     order={this.order(index)} key={index} index={index}>
                {item}
              </Slide>
            ))}
          </FlexContainer>
        </WheelContainer>
      );
    } else {
      /*
      TODO: Need some type of loading icon here
       */
      return (
        <div>Rendering</div>
      );
    }
  }
}

export default Wheel;
