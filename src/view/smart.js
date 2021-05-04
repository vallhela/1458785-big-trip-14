import AbstractView from './abstract.js';

import {replace} from '../utils/render.js';

export default class Smart extends AbstractView {
  constructor() {
    super();

    if (new.target === Smart) {
      throw new Error('Can\'t instantiate Smart, only concrete one.');
    }

    this._data = {};
    this.updateData = this.updateData.bind(this);
    this.updateElement = this.updateElement.bind(this);
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const oldElement = this.removeElement();
    if(oldElement === null || oldElement.parentElement === null) {
      return;
    }

    const newElement = this.getElement();
    replace(oldElement, newElement);
  }
}
