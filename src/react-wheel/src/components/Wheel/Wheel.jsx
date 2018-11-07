import React, { Children, cloneElement, Component } from "react";
import WheelContainer from "./WheelContainer";
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
      leaveDuration: 200,
      enterDuration: 200
    };

    this.wrapState = this.wrapState.bind(this);
    this.sortSlides = this.sortSlides.bind(this);
    this.slide = this.slide.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.slideBefore = this.slideBefore.bind(this);
    this.slideAfter = this.slideAfter.bind(this);
  }

  componentDidMount() {
    const props = Object.assign({}, this.props);
    this.setState({
      arrows: props.arrows === true,
      slidesShowing: props.slidesShowing === undefined ? 1 : props.slidesShowing,
      spacing: props.spacing === undefined ? 8 : props.spacing,
      in: true,
      leaveDuration: props.leaveDuration === undefined ? 300 : props.leaveDuration,
      enterDuration: props.enterDuration === undefined ? 300 : props.enterDuration
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
        currentIndex: this.state.slides.length - 1
      });
      return;
    }

    const slides = this.state.slides;
    const index = this.state.currentIndex + 1;
    const last = slides.length - 1;

    switch (index) {
      case last:
        return this.slide(slides[last], index, "left");
      default:
        return this.slide(slides[index], index, "left");
    }
  }

  previous() {
    if (this.state.currentIndex <= 0) {
      this.setState({
        currentIndex: 0
      });
      return;
    }

    const slides = this.state.slides;
    const index = this.state.currentIndex - 1;

    switch (index) {
      case 0:
        return this.slide(slides[0], 0, "right");
      default:
        return this.slide(slides[index], index, "right");
    }
  }

  async slide(slide, currentIndex, slideTo) {
    await this.slideBefore(currentIndex, slideTo);
    await this.slideAfter(slide);
  }

  slideBefore(currentIndex, slideTo) {
    return new Promise((resolve) => {
      this.setState({
        in: false,
        sliding: true,
        currentIndex,
        slideTo: slideTo,
      });
      resolve();
    });
  }

  slideAfter(slide) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState({
          sliding: false,
          in: true,
          currentSlide: slide
        });
        resolve();
      }, 200);
    });
  }

  render() {
    if (this.state.currentSlide !== undefined) {
      const enter = this.state.enterDuration;
      const leave = this.state.leaveDuration;
      const slide = this.state.currentSlide;
      const mounting = this.state.in;

      return (
        <WheelContainer spacing={this.props.spacing}
                        next={this.next} previous={this.previous}
                        theme={this.props.theme}>
          <div className={slideTransition.slideFlex}>
            {slide.map((item, index) => {
              if (this.state.slideTo === "right") {
                  return(
                    <Slide direction={"left"} className={slideTransition.slideOutLeft}
                           mountOnEnter unmountOnExit in={mounting}
                           key={index} index={index}
                           timeout={{enter: enter, exit: leave}}>
                      {item}
                    </Slide>
                  )
              } else {
                return(
                  <Slide direction={"right"} className={slideTransition.slideOutRight}
                         mountOnEnter unmountOnExit in={mounting}
                         key={index} index={index}
                         timeout={{enter: enter, exit: leave}}>
                    {item}
                  </Slide>
                )
              }
            })}
          </div>
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
