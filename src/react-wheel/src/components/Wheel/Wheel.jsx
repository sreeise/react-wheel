import React, { Children, cloneElement, Component } from "react";
import GridContainer from "./GridContainer";
import * as PropTypes from "prop-types";
import WheelUtils from "./utils/WheelUtils";
import SlideContainer from "./Slide";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

// Main implementation of Carousel where
// the slides are sorted properly
class Wheel extends Component {
  constructor(props) {
    super(props);
    this.slideMap = new Map();
    this.state = {
      slides: [],
      currentSlide: [],
      slideMap: this.slideMap,
      currentClass: "",
      slideTo: "right",
      in: false,
      arrows: true,
      sliding: false,
      infinite: false,
      spacing: 0,
      startSlide: 0,
      slideLength: 0,
      currentIndex: 0,
      slidesShowing: 0,
      leaveDuration: 300,
      enterDuration: 300,
    };

    this.wrapState = this.wrapState.bind(this);
    this.sortSlides = this.sortSlides.bind(this);
    this.slide = this.slide.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goTo = this.goTo.bind(this);
    this.isInfinite = this.isInfinite.bind(this);
    this.setSliding = this.setSliding.bind(this);
  }

  componentDidMount() {
    const props = Object.assign({}, this.props);
    this.setState({
      in: true,
      arrows: props.arrows,
      currentClass: props.classes.slide,
      infinite: props.infinite === true,
      spacing: props.spacing === undefined ? 8 : props.spacing,
      startSlide: props.startSlide === undefined ? 0 : props.startSlide,
      slidesShowing: props.slidesShowing === undefined ? 1 : props.slidesShowing,
      leaveDuration: props.leaveDuration === undefined ? 300 : props.leaveDuration,
      enterDuration: props.enterDuration === undefined ? 300 : props.enterDuration
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
      if (start === undefined || start > slideMap.size - 1) {
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

  isInfinite(slideTo) {
    if (this.state.infinite) {
      const slideMap = this.state.slideMap;

      if (slideTo === "left") {
        this.setSliding(0, "left");
        this.slide(slideMap.get(0), "right");
        return true;

      } else if (slideTo === "right") {
        const index = this.state.slideMap.size - 1;
        this.setSliding(index, "right");
        this.slide(slideMap.get(index), "left");
        return true;

      }
    }
    return false;
  }

  setSliding(currentIndex, slideTo) {
    this.setState({
      in: false,
      sliding: true,
      currentIndex,
      slideTo
    })
  }

  next() {
    if (this.state.currentIndex >= this.state.slideMap.size - 1) {
      if (this.isInfinite("left")) {
        return;
      }
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
    this.setSliding(index, "left");

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
      if (this.isInfinite("right")) {
        return;
      }
      if (this.state.currentIndex !== 0) {
        this.setState({
          currentIndex: 0,
        });
      }
      return;
    }

    const slideMap = this.state.slideMap;
    const index = this.state.currentIndex - 1;
    this.setSliding(index, "right");

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
      this.slide(this.state.slideMap.get(index), "left");
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
        currentSlide
      });
    }, 90);
  }

  render() {
    if (this.state.currentSlide !== undefined) {
      const { classes } = this.props;
      const enter = this.state.enterDuration;
      const leave = this.state.leaveDuration;
      const slide = this.state.currentSlide;
      const mounting = this.state.in;
      const direction = this.state.slideTo === "right" ? "left" : "right";
      const currentClass = this.state.currentClass;

      return (
        <GridContainer spacing={this.props.spacing}
                       next={this.next}
                       previous={this.previous}
                       hoverArrowRight={this.props.hoverArrowRight}
                       hoverArrowLeft={this.props.hoverArrowLeft}
                       arrows={this.state.arrows}
                       arrowColor={this.props.arrowColor}
                       theme={this.props.theme}>
          <div className={classes.slideFlex}>
            <SlideContainer slide={slide}
                            in={mounting}
                            className={currentClass}
                            timeout={{ enter: enter, exit: leave }}
                            direction={direction}/>
          </div>
        </GridContainer>
      );
    }
  }
}

Wheel.propTypes = {
  classes: PropTypes.object.isRequired,
  arrowColor: PropTypes.string,
  arrows: PropTypes.bool,
  theme: PropTypes.string,
  hoverArrowLeft: PropTypes.func,
  hoverArrowRight: PropTypes.func,
  spacing: PropTypes.number,
  leaveDuration: PropTypes.number,
  enterDuration: PropTypes.number,
  startSlide: PropTypes.number,
  infinite: PropTypes.bool
};

export default withStyles(styles)(Wheel);
