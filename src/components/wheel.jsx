import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core";
import SlideArrayList from "./SlideArrayList.jsx";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: { main: "#11cb5f" }
  },
  typography: {
    useNextVariants: true
  }
});

function randomNumber(max) {
  return Math.floor(Math.random() * max + 1);
}

function LeftArrow(props) {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <Button
        disabled={props.disabled}
        className={"AppBar-sites_leftArrow"}
        onClick={props.onClick}
      >
        <ChevronLeft />
      </Button>
    </MuiThemeProvider>
  );
}

function RightArrow(props) {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <Button
        disabled={props.disabled}
        className={"AppBar-sites_rightArrow"}
        onClick={props.onClick}
      >
        <ChevronRight />
      </Button>
    </MuiThemeProvider>
  );
}

class Wheel extends SlideArrayList {
  constructor(props) {
    super(props);

    this.state = {
      slideData: [null],
      slidesShowing: 0,
      arrows: true,
      arrowClass: "arrow-display-none",
      RADisabled: false,
      LADisabled: false
    };

    this.slideArrayList = new SlideArrayList();
    this.forward = this.forward.bind(this);
    this.backward = this.backward.bind(this);
    this.setSlidesShowing = this.setSlidesShowing.bind(this);
    this.getArrowDisplayClass = this.getArrowDisplayClass.bind(this);
    this.define = this.define.bind(this);
    this.copy = this.copy.bind(this);
  }

  componentDidMount() {
    let slidesShowing = this.props.slidesShowing;
    let children = this.props.children;
    this.define(children);
    const array = this.copy(this.slideArrayList.toArray(), 0, slidesShowing);
    let arrows = this.props.arrows;

    if (arrows === false) {
      this.setState({
        arrows: false,
        arrowClass: "arrow-display-none",
        slidesShowing: slidesShowing,
        slideData: array
      });
    } else {
      this.setState({
        arrows: true,
        arrowClass: "arrow-display",
        slidesShowing: slidesShowing,
        slideData: array
      });
    }
  }

  componentDidUpdate() {
    if (this.slideArrayList.isEmpty()) {
      this.setState({
        RADisabled: true,
        LADisabled: true,
        arrowClass: "arrow-display-none"
      });
    }
  }

  define(children) {
    for (let i = 0; i < children.length; i++) {
      let idNum = randomNumber(1000);
      this.slideArrayList.add({
        id: `slide-${idNum}`,
        data: children[i]
      });
    }
  }

  copy(children, start, end) {
    let array = [];
    for (let i = start; i < end; i++) {
      array.push({
        id: children[i].id,
        data: children[i].data
      });
    }
    return array;
  }

  getArrowDisplayClass() {
    let arrowDisplay = this.state.arrows;
    if (arrowDisplay === true) {
      this.setState({ arrowClass: "arrow-display" });
    } else {
      this.setState({ arrowClass: "arrow-display-none" });
    }
  }

  setSlidesShowing(amount) {
    this.setState({ slidesShowing: amount });
  }

  async forward(event) {
    event.preventDefault();
    this.setState({
      LADisabled: false
    });
    let slideData = this.state.slideData;
    let array = await this.slideArrayList.shiftRight(slideData);
    if (array !== null) {
      this.setState({
        slideData: array,
        RADisabled: false
      });
    } else {
      this.setState({
        RADisabled: true
      });
    }
  }

  async backward(event) {
    event.preventDefault();
    this.setState({
      RADisabled: false
    });
    let slideData = this.state.slideData;
    let array = await this.slideArrayList.shiftLeft(slideData);
    if (array !== null) {
      this.setState({
        slideData: array,
        LADisabled: false
      });
    } else {
      this.setState({
        LADisabled: true
      });
    }
  }

  render() {
    return (
      <div className={"wheel-container"}>
        <Grid
          container
          spacing={24}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid className={this.state.arrowClass} item>
            <LeftArrow
              disabled={this.state.LADisabled}
              onClick={this.backward}
            />
          </Grid>
          {this.state.slideData.map(slide => {
            if (slide !== null) {
              return (
                <Grid
                  id={`${slide.id}`}
                  key={`${slide.id}wheel`}
                  xs={this.props.space}
                  item
                >
                  <div className={"wheel-slide"}>{slide.data}</div>
                </Grid>
              );
            }
          })}
          <Grid className={this.state.arrowClass} item>
            <RightArrow
              disabled={this.state.RADisabled}
              onClick={this.forward}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Wheel;
