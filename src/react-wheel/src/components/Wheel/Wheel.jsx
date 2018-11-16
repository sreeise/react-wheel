import React, { Children, cloneElement, Component } from "react";
import GridContainer from "./GridContainer";
import Slide from "@material-ui/core/Slide/Slide";
import slideTransition from "../../css/animation.module.css";
import * as PropTypes from "prop-types";
import WheelUtils from "./utils/WheelUtils";

// Main implementation of Carousel where
// the slides are sorted properly
class Wheel extends Component {
  constructor(props) {
    super(props);
    let slideMap = new Map();
    this.state = {
      slides: [],
      currentSlide: [],
      slideLength: 0,
      slideMap: slideMap,
      arrows: true,
      slidesShowing: 0,
      spacing: 0,
      currentIndex: 0,
      sliding: false,
      in: false,
      slideTo: "right",
      startSlide: 0,
      leaveDuration: 300,
      enterDuration: 300,
    };

    this.wrapState = this.wrapState.bind(this);
    this.sortSlides = this.sortSlides.bind(this);
    this.slide = this.slide.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goTo = this.goTo.bind(this);
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
      startSlide: props.startSlide === undefined ? 0 : props.startSlide
    });

    let slides = this.wrapState();
    let slidesShowing = this.props.slidesShowing;
    return this.sortSlides(slides, slidesShowing);
  }

  sortSlides(slides, slidesShowing) {
    // Put each slides elements in its own array
    let slideMap = this.state.slideMap;
    return new Promise((resolve) => {
      WheelUtils.sortSlides(slides, slideMap, slidesShowing);

      let start = this.props.startSlide;
      if (start === undefined || start > slideMap.size -1) {
        start = 0;
      }

      this.setState({
        slideLength: slideMap.size,
        currentSlide: slideMap.get(start),
        startSlide: start,
        currentIndex: start,
        slideMap,
      });
      resolve();
    });
  }

  wrapState() {
    const { children } = this.props;
    return Children.map(children, (child) => cloneElement(child));
  }

  next() {
    if (this.state.currentIndex >= this.state.slideMap.size - 1) {
      if (this.state.currentIndex !== this.state.slideMap.size - 1) {
        this.setState({
          currentIndex: this.state.slides.length - 1,
        });
      }
      return;
    }

    const slideMap = this.state.slideMap;
    const index = this.state.currentIndex + 1;
    const last = slideMap.size - 1;

    this.setState({
      in: false,
      sliding: true,
      currentIndex: index,
      slideTo: "left",
    });

    switch (index) {
      case last:
        this.slide(slideMap.get(last), "right");
        break;
      default:
        this.slide(slideMap.get(index), "right");
    }
  }

  previous() {
    if (this.state.currentIndex <= 0) {
      if (this.state.currentIndex !== 0) {
        this.setState({
          currentIndex: 0,
        });
      }
      return;
    }

    const slideMap = this.state.slideMap;
    const index = this.state.currentIndex - 1;

    this.setState({
      in: false,
      sliding: true,
      currentIndex: index,
      slideTo: "right",
    });

    switch (index) {
      case 0:
        this.slide(slideMap.get(0), "left");
        break;
      default:
        this.slide(slideMap.get(index), "left");
    }
  }

  goTo(index) {
    if (this.state.currentIndex <= index) {
      this.slide(this.state.slideMap.get(index), "left")
    } else {
      this.slide(this.state.slideMap.get(index), "right");
    }
  }

  slide(currentSlide, slideTo) {
    setTimeout(() => {
      this.setState({
        sliding: false,
        in: true,
        slideTo,
        currentSlide,
      });
    }, 90);
  }

  render() {
    if (this.state.currentSlide !== undefined) {
      const enter = this.state.enterDuration;
      const leave = this.state.leaveDuration;
      const slide = this.state.currentSlide;
      const mounting = this.state.in;
      const currentClass = slideTransition.slide;
      let direction = this.state.slideTo === "right" ? "left" : "right";

      return (
        <GridContainer spacing={this.props.spacing}
                       next={this.next}
                       previous={this.previous}
                       hoverArrowRight={this.props.hoverArrowRight}
                       hoverArrowLeft={this.props.hoverArrowLeft}
                       arrows={this.state.arrows}
                       arrowColor={this.props.arrowColor}
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


Wheel.propTypes = {
  arrowColor: PropTypes.string,
  arrows: PropTypes.bool,
  theme: PropTypes.string,
  hoverArrowLeft: PropTypes.func,
  hoverArrowRight: PropTypes.func,
  spacing: PropTypes.number,
  leaveDuration: PropTypes.number,
  enterDuration: PropTypes.number,
  startSlide: PropTypes.number,
};

export default Wheel;
