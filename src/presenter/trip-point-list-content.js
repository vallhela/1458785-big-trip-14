import TripPointListAreaView from '../view/trip-point-list-content-area';
import TripPointListItemView from '../view/trip-point-list-content-item';

import TripPointPresenter from './trip-point';
import TripPointListContentSortPresenter from './trip-point-list-content-sort';

import {render, RenderPosition, remove} from '../utils/render';
import {updateArrayItemById} from '../utils/common';
import {inverse} from '../utils/sort';
import {getFilter, getSorter} from '../utils/trip-point';

import {TripPointListContentSortType, TripPointListContentFilterType} from '../const';

import {TripPointFilterModelEventType} from '../model/trip-point-filter.js';
import {TripPointsModelEventType} from '../model/trip-points.js';

export default class TripPointListContent {
  constructor(container, pointsModel, filterModel) {
    this.init = this.init.bind(this);
    this.destroy = this.destroy.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handlePointDelete = this._handlePointDelete.bind(this);
    this._handleBeforeFormShown = this._handleBeforeFormShown.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._getDefaultSortType = this._getDefaultSortType.bind(this);
    this._handlePointsModelNotify= this._handlePointsModelNotify.bind(this);
    this._handleFilterModelNotify = this._handleFilterModelNotify.bind(this);

    this._container = container;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._currentFilterType = filterModel.getFilter();
    this._currentSortType = this._getDefaultSortType();
    this._pointPresenter = {};

    this._sortPresenter = null;
    this._areaComponent = null;
  }

  init() {
    this.destroy();

    this._sortPresenter = new TripPointListContentSortPresenter(this._container, this._handleSortTypeChange);
    this._sortPresenter.init(this._currentSortType);

    this._areaComponent = new TripPointListAreaView();
    render(this._container, this._areaComponent, RenderPosition.BEFOREEND);

    this._renderPoints();

    this._pointsModel.addObserver(this._handlePointsModelNotify);
    this._filterModel.addObserver(this._handleFilterModelNotify);
  }

  destroy() {
    this._filterModel.removeObserver(this._handleFilterModelNotify);
    this._pointsModel.removeObserver(this._handlePointsModelNotify);

    this._clearPoints();

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
    const pointPresenter = new TripPointPresenter(item, this._handlePointChange, this._handlePointDelete, this._handleBeforeFormShown);
    pointPresenter.init(point);

    render(this._areaComponent, item, RenderPosition.BEFOREEND);

    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._clearPoints();

    const filterType = this._filterModel.getFilter();
    const sortType = this._currentSortType;

    const points = this._pointsModel.getPoints();
    const filteredPoints = this._filterPoints(points, filterType);
    const sortedPoints = this._sortPoints(filteredPoints, sortType);

    this._sortPresenter.init(sortType);
    sortedPoints.forEach((point) => this._renderPoint(point));
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

  _handlePointDelete(deleted) {
    this._pointsModel.removePoint(deleted);
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

    this._currentSortType = sortType;
    this._renderPoints();
  }

  _handlePointsModelNotify(eventType, point) {
    if(eventType === TripPointsModelEventType.REMOVED)
    {
      this._renderPoints();
    }
    else if(eventType === TripPointsModelEventType.ADDED || eventType === TripPointsModelEventType.REFRESHED) {
      this._currentFilterType = this._getDefaultFilterType();
      this._filterModel.setFilter(this._currentFilterType);

      this._currentSortType = this._getDefaultSortType();
      this._renderPoints();
    }
    else if(eventType == TripPointsModelEventType.UPDATED) {
      this._pointPresenter[point.id].init(point);
    }
  }

  _handleFilterModelNotify(eventType, filterType) {
    if(eventType !== TripPointFilterModelEventType.CHANGED) {
      return;
    }

    if(this._currentFilterType === filterType) {
      return;
    }

    this._currentSortType = this._getDefaultSortType();
    this._renderPoints();
  }

  _filterPoints(points, filterType) {
    const filter = getFilter(filterType);
    return filter(points);
  }

  _sortPoints(points, sortType) {
    const sorter = getSorter(sortType);
    return points.sort(inverse(sorter));
  }

  _getDefaultSortType() {
    return TripPointListContentSortType.DAY;
  }

  _getDefaultFilterType() {
    return TripPointListContentFilterType.EVERYTHING;
  }
}
