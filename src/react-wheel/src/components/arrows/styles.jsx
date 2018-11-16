import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import deepPurple from "@material-ui/core/colors/deepPurple";
import orange from "@material-ui/core/colors/orange";
import yellow from "@material-ui/core/colors/yellow";
import amber from "@material-ui/core/colors/amber";

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit * 2,
    zIndex: 2,
  },
  iconRed: {
    margin: theme.spacing.unit * 2,
    zIndex: 2,
    '&:hover': {
      color: red[800],
    },
  },
  iconBlue: {
    margin: theme.spacing.unit * 2,
    zIndex: 2,
    '&:hover': {
      color: blue[500],
    },
  },
  iconPurple: {
    margin: theme.spacing.unit * 2,
    zIndex: 2,
    '&:hover': {
      color: deepPurple[500],
    },
  },
  iconOrange: {
    margin: theme.spacing.unit * 2,
    zIndex: 2,
    '&:hover': {
      color: orange[800],
    },
  },
  iconAmber: {
    margin: theme.spacing.unit * 2,
    zIndex: 2,
    '&:hover': {
      color: amber[800],
    },
  },
  iconYellow: {
    margin: theme.spacing.unit * 2,
    zIndex: 2,
    '&:hover': {
      color: yellow[800],
    },
  },
  iconDisabled: {
    display: "none"
  },
});

export default styles;