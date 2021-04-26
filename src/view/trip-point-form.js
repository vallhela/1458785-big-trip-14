import dayjs from 'dayjs';
import {createEditFromEventTypeListTemplate} from './edit-form-event-type-list.js';
import {createEditFormEventDetailsTemplate} from './edit-form-event-details.js';
import AbstractView from './abstract.js';

const createTemplate = (evt) => {
  const index = 1;
  const dateFrom = dayjs(evt.dateFrom);
  const dateTo = dayjs(evt.dateTo);

  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${index}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${evt.type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${index}" type="checkbox">
      ${createEditFromEventTypeListTemplate(evt.type)}
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${index}">
        ${evt.type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${index}" type="text" name="event-destination" value="${evt.destination.name}" list="destination-list-${index}">
      <datalist id="destination-list-${index}">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${index}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${index}" type="text" name="event-start-time" value="${dateFrom.format('DD/MM/YY HH:mm')}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${index}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${index}" type="text" name="event-end-time" value="${dateTo.format('DD/MM/YY HH:mm')}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${index}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${index}" type="text" name="event-price" value="${evt.price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  ${createEditFormEventDetailsTemplate(evt, { index })}
</form>`;
};

export default class EditForm extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createTemplate(this._point);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
  }

  _clickHandler() {
    const callback = this._callback.click;
    if(callback){
      callback();
    }
  }

  _onElementCreated(element) {
    element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._clickHandler();
    });
    element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this._clickHandler();
    });
  }
}
