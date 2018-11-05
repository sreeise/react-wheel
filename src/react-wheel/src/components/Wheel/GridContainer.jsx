import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import LeftArrow from "../arrows/LeftArrow";
import RightArrow from "../arrows/RightArrow";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const styles = theme => ({
  grid: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    justify: "flex-start",
  },
  container: {
    margin: theme.spacing * 2,
    maxWidth: "100%",
  },
  slides: {
    maxWidth: "100%",
    display: "block",
  },
});

const Container = styled.div`
  width: 100%
  max-width: 100%;
  padding: 20px;
`;


function GridContainer(props) {
  const { classes } = props;

  if (props.size < 0 || props.size > 10) {
    throw new Error("size prop must be 0 - 10");
  }

  return (
    <Container>
      <Grid container spacing={props.spacing}
            direction={"row"}
            className={classes.grid}>

        <Grid item xs={1} sm={1}>
          <LeftArrow theme={props.theme} onClick={props.previous}/>
        </Grid>


        <Grid item sm xs>
          <div className={classes.slides}>
            {props.children}
          </div>
        </Grid>


        <Grid item xs={1} sm={1}>
          <RightArrow theme={props.theme} onClick={props.next}/>
        </Grid>
      </Grid>
    </Container>
  );
}

GridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridContainer);
