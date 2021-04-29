import TripPointListAreaView from '../view/trip-point-list-area';
import TripPointListSortView from '../view/trip-point-list-sort';
import TripPointListEmptyView from '../view/trip-point-list-empty';
import TripPointListItemView from '../view/trip-point-list-item';

import TripPointPresenter from './trip-point';

import { render, RenderPosition} from '../utils/render';
import { updateArrayItemById } from '../utils/common';

export default class TripPointList {
  constructor(container) {
    this.init = this.init.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleBeforeFormShown = this._handleBeforeFormShown.bind(this);

    this._container = container;

    this._sortComponent = new TripPointListSortView();
    this._areaComponent = new TripPointListAreaView();

    this._pointPresenter = {};
  }

  init(points) {
    this._points = points;

    if(points && points.length > 0) {
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._areaComponent, RenderPosition.BEFOREEND);

      this._renderPoints(points);
    }
    else{
      render(this._container, new TripPointListEmptyView(), RenderPosition.BEFOREEND);
    }
  }

  _renderPoint(point) {
    const item = new TripPointListItemView();
    const pointPresenter = new TripPointPresenter(item, this._handlePointChange, this._handleBeforeFormShown);
    pointPresenter.init(point);

    render(this._areaComponent, item, RenderPosition.BEFOREEND);

    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _clearPoints() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _handlePointChange(updated) {
    this._points = updateArrayItemById(this._points, updated);
    this._pointPresenter[updated.id].init(updated);
  }

  _handleBeforeFormShown() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.showCard());
  }
}
