import TripPointListAreaView from '../view/trip-point-list-content-area';
import TripPointListItemView from '../view/trip-point-list-content-item';

import TripPointPresenter from './trip-point';
import TripPointListContentSortPresenter from './trip-point-list-content-sort';

import {render, RenderPosition, remove} from '../utils/render';
import {updateArrayItemById} from '../utils/common';
import {inverse} from '../utils/sort';
import {getSorter} from '../utils/trip-point';

import {TripPointListContentSortType} from '../const';

export default class TripPointListContent {
  constructor(container) {
    this.init = this.init.bind(this);
    this.destroy = this.destroy.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleBeforeFormShown = this._handleBeforeFormShown.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._container = container;
    this._currentSortType = TripPointListContentSortType.DAY;

    this._sortPresenter = null;
    this._areaComponent = null;
  }

  init(points) {
    if(this._points === undefined) {
      this._sortPresenter = new TripPointListContentSortPresenter(this._container, this._handleSortTypeChange);
      this._sortPresenter.init(this._currentSortType);

      this._areaComponent = new TripPointListAreaView();
      render(this._container, this._areaComponent, RenderPosition.BEFOREEND);

      this._pointPresenter = {};
    }
    else if(this._points !== null) {
      this._clearPoints();
    }

    this._points = points ? points.slice() : null;
    this._sortPoints();
    this._renderPoints();
  }

  destroy() {
    if(this._areaComponent !== null) {
      remove(this._areaComponent);
      this._areaComponent = null;
    }

    if(this._sortPresenter !== null) {
      this._sortPresenter.destroy();
      this._sortPresenter = null;
    }
  }

  _renderPoint(point) {
    const item = new TripPointListItemView();
    const pointPresenter = new TripPointPresenter(item, this._handlePointChange, this._handleBeforeFormShown);
    pointPresenter.init(point);

    render(this._areaComponent, item, RenderPosition.BEFOREEND);

    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    const points = this._points;
    if(points) {
      points.forEach((point) => this._renderPoint(point));
    }
  }

  _clearPoints() {
    // Maybe we should simply remove trip-point-list-content-area here?
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

  _handleSortTypeChange(sortType) {
    if(this._currentSortType ===  sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._currentSortType = sortType;

    this._clearPoints();
    this._renderPoints();
  }

  _sortPoints(sortType) {
    if(sortType === undefined) {
      sortType = this._currentSortType;
    }

    const sorter = getSorter(sortType);
    this._points.sort(inverse(sorter));
  }
}
