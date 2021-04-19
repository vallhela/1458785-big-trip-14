import TripEventView from './trip-event.js';
import EditFormView from './edit-form.js';
import {createElement, render, RenderPosition} from './utils.js';

const createTripEventListItemTemplate = () => {
  return `<li class="trip-events__item">
</li>
`;
};

export default class TripEventItem {
  constructor(evt, options) {
    this._editForm = new EditFormView(evt, options);
    this._tripEvent = new TripEventView(evt);
    this._element = null;

    const renderForm = () => {
      this._element.replaceChild(this._editForm.getElement(), this._tripEvent.getElement());
    };

    const renderEvent = () => {
      this._element.replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
    };

    this._tripEvent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      renderForm();
    });

    this._editForm.getElement().addEventListener('submit', (e) => {
      e.preventDefault();
      renderEvent();
    });
  }

  getTemplate() {
    return createTripEventListItemTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      render(this._element, this._tripEvent.getElement(), RenderPosition.BEFOREEND);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
