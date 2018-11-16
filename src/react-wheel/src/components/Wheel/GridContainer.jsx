import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import LeftArrow from "../arrows/LeftArrow";
import RightArrow from "../arrows/RightArrow";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Mapper from "./Mapper";

const styles = theme => ({
  grid: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    justify: "center",
    margin: theme.spacing * 2
  },
  container: {
    margin: theme.spacing * 2,
    maxWidth: "100%",
  },
});

class GridContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spacing: 0,
      arrows: true,
      arrowColor: "",
      theme: "light",
    };
  }

  componentDidMount() {
    const props = Object.assign({}, this.props);
    this.setState({
      spacing: props.spacing || 0,
      arrows: props.arrows !== false,
      theme: props.theme,
      arrowColor: props.arrowColor === undefined ? "none" : props.arrowColor,
    });
  }

  componentDidCatch(error, errorInfo) {
    console.error(`GridContainer Error: ${error}`);
    console.info(`GridContainer Error Info: ${errorInfo}`);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Grid container
              spacing={this.props.spacing}
              direction={"row"}
              className={classes.grid}>

          <Grid item xs={1} sm={1}>
            <LeftArrow arrows={this.state.arrows}
                       theme={this.props.theme}
                       onMouseOver={this.props.hoverArrowLeft}
                       arrowColor={this.props.arrowColor}
                       onClick={this.props.previous}/>
          </Grid>

          <Grid item sm xs>
            <Mapper className={classes.grid}>
              {this.props.children}
            </Mapper>
          </Grid>

          <Grid item xs={1} sm={1}>
            <RightArrow arrows={this.props.arrows !== false}
                        theme={this.props.theme}
                        arrowColor={this.props.arrowColor}
                        onMouseOver={this.props.hoverArrowRight}
                        onClick={this.props.next}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

GridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridContainer);
