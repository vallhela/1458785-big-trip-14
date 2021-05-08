import {TripPointListContentFilterType} from '../const.js';

import Observable from '../utils/observable';

const TripPointFilterModelEventType = {
  CHANGED: 'changed',
};

export {TripPointFilterModelEventType};

export default class TripPointFilterModel extends Observable {
  constructor() {
    super();
    this.getFilter = this.getFilter.bind(this);
    this.setFilter = this.setFilter.bind(this);

    this._filter = TripPointListContentFilterType.EVERYTHING;
  }

  getFilter() {
    return this._filter;
  }

  setFilter(value) {
    if(value === undefined || value === null) {
      throw new Error('Value is invalid.');
    }

    this._filter = value;
    this._notify(TripPointFilterModelEventType.CHANGED, value);
  }
}
