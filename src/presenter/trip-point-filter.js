import TripPointFilterHeaderView from '../view/trip-point-filter-header.js';
import TripPointFilterFormView from '../view/trip-point-filter-form.js';

import {TripPointFilterModelEventType} from '../model/trip-point-filter.js';

import { render, RenderPosition, remove} from '../utils/render';

export default class TripPointFilter {
  constructor(container, model) {
    this.init = this.init.bind(this);
    this.destroy = this.destroy.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._container = container;
    this._model = model;

    this._headerComponent = null;
    this._formComponent = null;
  }

  init() {
    this.destroy();

    this._headerComponent = new TripPointFilterHeaderView();
    this._formComponent = new TripPointFilterFormView(this._model.getFilter());
    this._formComponent.setFilterTypeChangeHandler(this._filterTypeChangeHandler.bind(this));

    this._model.addObserver(this._handleModelEvent);

    render(this._container, this._headerComponent, RenderPosition.BEFOREEND);
    render(this._container, this._formComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    this._model.removeObserver(this._handleModelEvent);

    if(this._formComponent !== null) {
      remove(this._formComponent);
      this._formComponent = null;
    }

    if(this._headerComponent !== null) {
      remove(this._headerComponent);
      this._headerComponent = null;
    }
  }

  _filterTypeChangeHandler(value) {
    this._model.setFilter(value);
  }

  _handleModelEvent(eventType) {
    if(eventType !== TripPointFilterModelEventType.CHANGED) {
      return;
    }

    this.init();
  }
}
