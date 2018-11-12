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
  },
  container: {
    margin: theme.spacing * 2,
    maxWidth: "100%",
  },
});

class GridContainer extends React.Component {
  constructor(props) {
    super(props);
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
            <LeftArrow arrows={this.props.arrows} theme={this.props.theme} onClick={this.props.previous}/>
          </Grid>

          <Grid item sm xs>
            <Mapper className={classes.grid}>
              {this.props.children}
            </Mapper>
          </Grid>

          <Grid item xs={1} sm={1}>
            <RightArrow arrows={this.props.arrows} theme={this.props.theme} onClick={this.props.next}/>
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
