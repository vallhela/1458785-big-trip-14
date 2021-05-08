import AbstractView from './abstract.js';

import {TripPointListContentFilterType} from '../const.js';

const createTemplate = (defaultFilterType) => {
  const generateMarkup = (filterType) =>{
    return `${filterType === defaultFilterType ? 'checked' : ''} data-filter-type="${filterType}"`;
  };

  return `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${generateMarkup(TripPointListContentFilterType.EVERYTHING)}>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${generateMarkup(TripPointListContentFilterType.FUTURE)}>
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${generateMarkup(TripPointListContentFilterType.PAST)}>
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class TripPointFilterForm extends AbstractView {
  constructor(defaultFilterType){
    super();

    this._defaultFilterType = defaultFilterType;
  }

  getTemplate() {
    return createTemplate(this._defaultFilterType);
  }

  _onElementCreated(element) {
    const filters = element.querySelectorAll('.trip-filters__filter-input');
    filters.forEach((radio) => {
      radio.addEventListener('change', (evt) => {
        this._filterTypeChangeHandler(evt);
      });
    });
  }

  _filterTypeChangeHandler(evt) {
    if(this._callback.filterTypeChange === undefined || this._callback.filterTypeChange === null) {
      return;
    }

    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
  }
}
