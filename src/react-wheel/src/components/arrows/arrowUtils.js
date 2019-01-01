const ArrowUtils = {
  getHoverClass(classes, color) {
    switch (color) {
      case "blue":
        return classes.iconBlue;
      case "red":
        return classes.iconRed;
      case "purple":
        return classes.iconPurple;
      case "orange":
        return classes.iconOrange;
      case "yellow":
        return classes.iconYellow;
      case "amber":
        return classes.iconAmber;
      default:
        return classes.icon;
    }
  },
};

export default ArrowUtils;
