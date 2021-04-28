import {createElement} from '../utils/render.js';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._onElementCreated(this._element);
    }

    return this._element;
  }

  removeElement() {
    const element = this._element;
    this._element = null;

    return element;
  }

  _onElementCreated() {
  }
}
