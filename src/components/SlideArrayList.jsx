import React from "react";
import ArrayList from "./utils/ArrayList";

class SlideArrayList extends React.Component {
  constructor(props) {
    super(props);
    this.ArrayList = new ArrayList();
  }

  add(obj) {
    this.ArrayList.add(obj);
  }

  find(id) {
    return new Promise(resolve => {
      this.toArray().forEach(slide => {
        if (slide.id === id) {
          resolve(this.indexOf(slide));
        }
      });
      resolve(null);
    });
  }

  isLast(id) {
    let lastId = this.getId(this.size() - 1);
    return lastId === id;
  }

  isFirst(id) {
    let firstId = this.getId(0);
    return firstId === id;
  }

  async shiftRight(slideData) {
    let slides = slideData;
    let length = slides.length - 1;
    let index = await this.find(slides[length].id);
    return new Promise(resolve => {
      if (index !== null && !this.isLast(slides[length].id)) {
        let id = this.getId(index + 1);
        let data = this.getData(index + 1);
        let array = [];
        for (let i = 1; i < slides.length; i++) {
          array.push({
            id: slides[i].id,
            data: slides[i].data
          });
        }

        array.push({
          id: id,
          data: data
        });
        resolve(array);
      } else {
        resolve(null);
      }
    });
  }

  async shiftLeft(slideData) {
    let slides = slideData;
    const id = slides[0].id;
    const index = await this.find(id);

    return new Promise(resolve => {
      if (index !== null && !this.isFirst(id)) {
        let id = this.getId(index - 1);
        let data = this.getData(index - 1);
        let array = [];
        array.push({
          id: id,
          data: data
        });

        for (let i = 0; i < slides.length - 1; i++) {
          array.push({
            id: slides[i].id,
            data: slides[i].data
          });
        }

        resolve(array);
      } else {
        resolve(null);
      }
    });
  }

  get(index) {
    return this.ArrayList.get(index);
  }

  toArray() {
    return this.ArrayList.toArray();
  }

  getId(index) {
    return this.ArrayList.get(index).id;
  }

  getData(index) {
    return this.ArrayList.get(index).data;
  }

  setObj(index, obj) {
    this.ArrayList.set(index, obj);
  }

  remove(index) {
    this.ArrayList.remove(index);
  }

  size() {
    return this.ArrayList.size();
  }

  clear() {
    return this.ArrayList.clear();
  }

  indexOf(obj) {
    return this.ArrayList.indexOf(obj);
  }

  isEmpty() {
    return this.ArrayList.isEmpty();
  }

  reduceObj(state) {
    return Object.assign({}, state);
  }

  reduce(state, action) {
    return new Promise(async resolve => {
      const currentState = this.reduceObj(state);
      currentState.slideData.forEach((slide, index) => {
        if (slide.id === action.id) {
          this.remove(index);
        }
      });
      const array = this.ArrayList.toArray();
      resolve(array);
    });
  }
}

export default SlideArrayList;
