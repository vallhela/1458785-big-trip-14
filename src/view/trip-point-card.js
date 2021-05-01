import dayjs from 'dayjs';
import {createOfferListTemplate} from './trip-event-offer-list.js';
import AbstractView from './abstract.js';

const formatDurationPart = (value) => {
  let result = '';
  if(value < 10) {
    result += '0';
  }

  result += value;
  return result;
};

const getDuration = (start, end) => {
  if(start == null || end == null) {
    return '';
  }

  let diff = end.diff(start, 'minute');
  if(diff < 0) {
    return '';
  }

  const days = parseInt(diff/(24*60));
  diff = diff - days * 24 * 60;

  const hours = parseInt(diff / 60);
  diff = diff - hours * 60;

  const minutes = diff;

  let result = '';
  if(days > 0) {
    result += `${formatDurationPart(days)}D `;
  }

  if(hours > 0 || days > 0) {
    result += `${formatDurationPart(hours)}H `;
  }

  result += `${formatDurationPart(minutes)}M`;

  return result;
};

const createTemplate = (point) => {
  const dateFrom = dayjs(point.dateFrom);
  const dateTo = dayjs(point.dateTo);
  const duration = getDuration(dateFrom, dateTo);
  const favorite = point.isFavorite ? 'event__favorite-btn--active' : '';

  return `<div class="event">
  <time class="event__date" datetime="${dateFrom.format('YYYY-MM-DD').toUpperCase()}">${dateFrom.format('MMM DD')}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${point.type} ${point.destination.name}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${dateFrom.format('YYYY-MM-DDTHH:mm')}">${dateFrom.format('HH:mm')}</time>
      &mdash;
      <time class="event__end-time" datetime="${dateTo.format('YYYY-MM-DDTHH:mm')}">${dateTo.format('HH:mm')}</time>
    </p>
    <p class="event__duration">${duration}</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${point.price}</span>
  </p>
  ${createOfferListTemplate(point.offers)}
  <button class="event__favorite-btn ${favorite}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>`;
};

export default class TripPointCard extends AbstractView {
  constructor(point) {
    super();

    this._openEditClickHandler = this._openEditClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this._point = point;
  }

  getTemplate() {
    return createTemplate(this._point);
  }

  setOpenEditClickHandler(callback) {
    this._callback.openEditClick = callback;
  }

  _openEditClickHandler() {
    const callback = this._callback.openEditClick;
    if(callback){
      callback();
    }
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
  }

  _favoriteClickHandler() {
    const callback = this._callback.favoriteClick;
    if(callback){
      callback();
    }
  }

  _onElementCreated(element) {
    element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this._openEditClickHandler();
    });
    element.querySelector('.event__favorite-btn').addEventListener('click', () => {
      this._favoriteClickHandler();
    });
  }
}
