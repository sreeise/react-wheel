import React, { Children, cloneElement, Component } from "react";
import GridContainer from "./GridContainer";
import Slide from "@material-ui/core/Slide/Slide";
import slideTransition from "../../css/animation.module.css";

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
      spacing: 0,
      currentIndex: 0,
      sliding: false,
      in: false,
      slideTo: "left",
      leaveDuration: 300,
      enterDuration: 300,
    };

    this.wrapState = this.wrapState.bind(this);
    this.sortSlides = this.sortSlides.bind(this);
    this.slide = this.slide.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  componentDidMount() {
    const props = Object.assign({}, this.props);
    this.setState({
      arrows: props.arrows,
      slidesShowing: props.slidesShowing === undefined ? 1 : props.slidesShowing,
      spacing: props.spacing === undefined ? 8 : props.spacing,
      in: true,
      leaveDuration: props.leaveDuration === undefined ? 300 : props.leaveDuration,
      enterDuration: props.enterDuration === undefined ? 300 : props.enterDuration,
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
    return Children.map(children, (child) => cloneElement(child));
  }

  next() {
    if (this.state.currentIndex >= this.state.slides.length - 1) {
      this.setState({
        currentIndex: this.state.slides.length - 1,
      });
      return;
    }

    const slides = this.state.slides;
    const index = this.state.currentIndex + 1;
    const last = slides.length - 1;

    this.setState({
      in: false,
      sliding: true,
      currentIndex: index,
      slideTo: "left",
    });

    switch (index) {
      case last:
        this.slide(slides[last], "left");
        break;
      default:
        this.slide(slides[index], "left");
    }
  }

  previous() {
    if (this.state.currentIndex <= 0) {
      this.setState({
        currentIndex: 0,
      });
      return;
    }

    const slides = this.state.slides;
    const index = this.state.currentIndex - 1;

    this.setState({
      in: false,
      sliding: true,
      currentIndex: index,
      slideTo: "right",
    });

    switch (index) {
      case 0:
        this.slide(slides[0], "right");
        break;
      default:
        this.slide(slides[index], "right");
    }
  }

  slide(slide, slideTo) {
    setTimeout(() => {
      this.setState({
        sliding: false,
        in: true,
        slideTo,
        currentSlide: slide,
      });
    }, 80);
  }

  render() {
    if (this.state.currentSlide !== undefined) {
      const enter = this.state.enterDuration;
      const leave = this.state.leaveDuration;
      const slide = this.state.currentSlide;
      const mounting = this.state.in;
      let currentClass = this.state.slideTo === "right" ?
        slideTransition.slideOutLeft : slideTransition.slideOutRight;
      let direction = this.state.slideTo === "right" ? "left" : "right";

      return (
        <GridContainer spacing={this.props.spacing}
                        next={this.next}
                        previous={this.previous}
                        arrows={this.state.arrows}
                        theme={this.props.theme}>
          <div className={slideTransition.slideFlex}>
            {slide.map((item, index) => (
              <Slide direction={direction}
                     className={currentClass}
                     mountOnEnter
                     unmountOnExit
                     in={mounting}
                     key={index}
                     index={index}
                     timeout={{ enter: enter, exit: leave }}>
                {item}
              </Slide>
            ))}
          </div>
        </GridContainer>
      );
    }
  }
}

export default Wheel;
