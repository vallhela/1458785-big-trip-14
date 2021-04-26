import TripPointListAreaView from '../view/trip-point-list-area';
import TripPointListSortView from '../view/trip-point-list-sort';
import TripPointListEmptyView from '../view/trip-point-list-empty';

import TripPointListItemPresenter from './trip-point-list-item';

import { render, RenderPosition } from '../utils/render';

export default class TripPointList {
  constructor(container) {
    this.init = this.init.bind(this);

    this._container = container;

    this._sortComponent = new TripPointListSortView();
    this._areaComponent = new TripPointListAreaView();
  }

  init(points) {
    if(points && points.length > 0) {
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._areaComponent, RenderPosition.BEFOREEND);

      this._points = points.map(
        (point) => {
          const item = new TripPointListItemPresenter(this._areaComponent);
          item.init(point);

          return item;
        });
    }
    else{
      render(this._container, new TripPointListEmptyView(), RenderPosition.BEFOREEND);
    }
  }
}
