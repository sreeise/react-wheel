const WheelUtils = {
  sortSlides(slides, slideMap, slidesShowing) {
    let index = 0;
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

      slideMap.set(index, tempArray);
      index++;
      tempArray = [];
      tempArray.length = 0;
    }
  },
};

export default WheelUtils;
