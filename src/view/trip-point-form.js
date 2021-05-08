import dayjs from 'dayjs';

import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

import TripPointFormTypeView from './trip-point-form-type.js';
import TripPointFormOfferListView from './trip-point-form-offer-list.js';
import TripPointFormDestinationView from './trip-point-form-destination.js';
import TripPointFormDetailsView from './trip-point-form-details.js';
import TripPointFormDestinationPhotoListView from './trip-point-form-destination-photo-list.js';

import {getAllDestinations, getAllEventTypes} from '../mock/mock-data.js';

import SmartView from './smart.js';
import { render, RenderPosition } from '../utils/render.js';

const createDestinationCityOptionTemplate = (city) => {
  return `<option value="${city}"></option>`;
};

const createTemplate = (point, cities) => {
  const dateFrom = dayjs(point.dateFrom);
  const dateTo = dayjs(point.dateTo);

  const pointType = point.type;

  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination">
        ${pointType}
      </label>
      <input class="event__input  event__input--destination" id="event-destination" type="text" name="event-destination" value="${point.destination.name}" list="destination-list">
      <datalist id="destination-list">
        ${cities.map((city) => createDestinationCityOptionTemplate(city)).join('\n')}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time">From</label>
      <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="${dateFrom.format('DD/MM/YY HH:mm')}">
      &mdash;
      <label class="visually-hidden" for="event-end-time">To</label>
      <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${dateTo.format('DD/MM/YY HH:mm')}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price" type="text" name="event-price" value="${point.price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
</form>`;
};

const parsePointToData = (point) => {
  return Object.assign(
    {},
    point,
    {},
  );
};

const parseDataToPoint = (data) => {
  return Object.assign(
    {},
    data,
    {},
  );
};
export default class TripPointForm extends SmartView {
  constructor(point) {
    super();
    this._data = parsePointToData(point);
    this._destinations = getAllDestinations();
    this._eventTypes = getAllEventTypes();

    this._clickHandler = this._clickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._offerCheckedChangeHandler = this._offerCheckedChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this.reset = this.reset.bind(this);

    this._startDatePicker = null;
    this._endDatePicker = null;
  }

  getTemplate() {
    return createTemplate(this._data, this._destinations.map((destination) => destination.name));
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

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
  }

  _formSubmitHandler() {
    const callback = this._callback.formSubmit;
    if(callback){
      const point = parseDataToPoint(this._data);
      callback(point);
    }
  }

  setDeleteHandler(callback) {
    this._callback.delete = callback;
  }

  _deleteHandler() {
    const callback = this._callback.delete;
    if(callback){
      const point = parseDataToPoint(this._data);
      callback(point);
    }
  }

  reset(point) {
    this.updateData(parsePointToData(point));
  }

  _onElementCreated(element) {
    element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler();
    });
    element.querySelector('.event__reset-btn').addEventListener('click', this._deleteHandler.bind(this));
    element.querySelector('.event__input--destination').addEventListener('change', this._destinationChangeHandler);
    element.querySelector('.event__rollup-btn').addEventListener('click', this._clickHandler);


    const headerComponent = element.querySelector('.event__header');
    const typeComponent = new TripPointFormTypeView(this._eventTypes.map((eventType) => eventType.type), this._data.type);
    typeComponent.setSelectedChangeHandler(this._typeChangeHandler);

    render(headerComponent, typeComponent, RenderPosition.AFTERBEGIN);


    const offerListComponent = this._tryCreateOfferListView(this._data);
    const destinationComponent = this._tryCreateDestinationView(this._data);
    if(offerListComponent === null && destinationComponent === null) {
      return;
    }

    const detailsComponent = new TripPointFormDetailsView();
    if(offerListComponent !== null) {
      render(detailsComponent, offerListComponent, RenderPosition.BEFOREEND);
    }
    if(destinationComponent !== null) {
      render(detailsComponent, destinationComponent, RenderPosition.BEFOREEND);
    }

    render(element, detailsComponent, RenderPosition.BEFOREEND);

    this._setStartDatePicker(element.querySelector('#event-start-time'));
    this._setEndDatePicker(element.querySelector('#event-end-time'));
  }

  _typeChangeHandler(type) {
    const eventType = this._eventTypes.find((p) => p.type === type);
    const update = {
      type: eventType.type,
      offers: eventType.offers,
    };

    this.updateData(update);
  }

  _destinationChangeHandler(evt) {
    const city = evt.target.value;
    const destination = this._destinations.find((destination) => destination.name === city);

    const update = {destination: destination};
    this.updateData(update);
  }

  _offerCheckedChangeHandler(evt) {
    const copy = this._data.offers.slice().map((offer) => Object.assign({}, offer, {}));
    copy.filter((offer) => offer.type === evt.offer.type).forEach((offer)=>offer.checked = evt.checked);

    const update = {
      offers: copy,
    };

    this.updateData(update);
  }

  _tryCreateOfferListView(data) {
    if(data === null || data.offers === null || data.offers.length === 0) {
      return null;
    }

    return new TripPointFormOfferListView(data.offers, this._offerCheckedChangeHandler);
  }

  _tryCreateDestinationView(data) {
    if(data === null || data.destination === null || data.destination.description === null) {
      return null;
    }

    const destinationComponent = new TripPointFormDestinationView(data.destination);
    if(data.destination.photos !== null && data.destination.photos.length > 0) {
      const photosComponent = new TripPointFormDestinationPhotoListView(data.destination.photos);
      render(destinationComponent, photosComponent, RenderPosition.BEFOREEND);
    }

    return destinationComponent;
  }

  _startDateChangeHandler([date]) {
    this.updateData({
      dateFrom: date,
    });
  }

  _setStartDatePicker(element) {
    if (this._startDatePicker) {
      this._startDatePicker.destroy();
      this._startDatePicker = null;
    }

    this._startDatePicker = flatpickr(
      element,
      {
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.dateFrom,
        onChange: this._startDateChangeHandler,
      },
    );
  }

  _endDateChangeHandler([date]) {
    this.updateData({
      dateTo: date,
    });
  }

  _setEndDatePicker(element) {
    if (this._endDatePicker) {
      this._endDatePicker.destroy();
      this._endDatePicker = null;
    }

    this._endDatePicker = flatpickr(
      element,
      {
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.dateTo,
        onChange: this._endDateChangeHandler,
      },
    );
  }
}
