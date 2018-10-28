/*
A dynicimally resizable array implementation.
 */

function ArrayList() {
  this.array = [];
}

ArrayList.prototype = {
  add(element) {
    this.array.push(element);
  },

  get(index) {
    return this.array[index];
  },

  toArray() {
    return this.array;
  },

  set(index, element) {
    this.array[index] = element;
  },

  clear() {
    this.array = [];
    this.array.length = 0;
  },

  isEmpty() {
    return this.array.length === 0;
  },

  remove(index) {
    this.array.splice(index, 1);
  },

  removeRange(start, end) {
    this.array.splice(start, end);
  },

  size() {
    return this.array.length;
  },

  clone() {
    const array2 = [];
    this.array.forEach(value => {
      array2.push(value);
    });

    return array2;
  },

  indexOf(obj) {
    return this.array.indexOf(obj);
  }
};

export default ArrayList;
