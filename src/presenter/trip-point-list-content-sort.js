import TripPointListContentSortView from '../view/trip-point-list-content-sort.js';

import {render, RenderPosition, tryReplace, remove} from '../utils/render';

export default class TripPointListContentSort {
  constructor(container, sortTypeChange) {
    this.init = this.init.bind(this);
    this.destroy = this.destroy.bind(this);

    this._container = container;
    this._sortTypeChange = sortTypeChange;

    this._component = null;
  }

  init(sortType) {
    const component = new TripPointListContentSortView(sortType);
    component.setSortTypeChangeHandler(this._sortTypeChange);

    if(!tryReplace(this._component, component)) {
      render(this._container, component, RenderPosition.BEFOREEND);
    }

    this._component = component;
  }

  destroy() {
    if(this._component !== null) {
      remove(this._component);
      this._component = null;
    }
  }
}
