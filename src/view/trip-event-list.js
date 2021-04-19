import {createElement} from './utils.js';

const createTripEventListTemplate = () => {
  return `<ul class="trip-events__list">
</ul>
`;
};

export default class TripEventList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventListTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
