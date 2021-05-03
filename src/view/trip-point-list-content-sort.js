import AbstractView from './abstract.js';

import {TripPointListContentSortType} from '../const.js';

const createTemplate = (defaultSortType) => {
  const generateMarkup = (sortType) =>{
    return `${sortType === defaultSortType ? 'checked' : ''} data-sort-type="${sortType}"`;
  };

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${generateMarkup(TripPointListContentSortType.DAY)}">
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled ${generateMarkup(TripPointListContentSortType.EVENT)}">
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${generateMarkup(TripPointListContentSortType.TIME)}">
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${generateMarkup(TripPointListContentSortType.PRICE)}">
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled ${generateMarkup(TripPointListContentSortType.OFFER)}">
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`;
};

export default class TripPointListContentSort extends AbstractView {
  constructor(defaultSortType) {
    super();

    this._defaultSortType = defaultSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createTemplate(this._defaultSortType);
  }

  _onElementCreated(element) {
    const sorts = element.querySelectorAll('.trip-sort__input');
    sorts.forEach((radio) => {
      radio.addEventListener('change', (evt) => {
        this._sortTypeChangeHandler(evt);
      });
    });
  }

  _sortTypeChangeHandler(evt) {
    if(this._callback.sortTypeChange === undefined || this._callback.sortTypeChange === null) {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
  }
}
