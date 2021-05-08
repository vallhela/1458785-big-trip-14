import TripPointListEmptyView from '../view/trip-point-list-empty';

import TripPointListContentPresenter from './trip-point-list-content';

import { render, RenderPosition, remove} from '../utils/render';

export default class TripPointList {
  constructor(container, pointsModel, filterModel) {
    this.init = this.init.bind(this);
    this.destroy = this.destroy.bind(this);

    this._container = container;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._emptyComponent = null;
    this._contentPresenter = null;
  }

  init() {
    this.destroy();

    const hasPoints = this._pointsModel.hasPoints();
    if(hasPoints) {
      this._contentPresenter = new TripPointListContentPresenter(this._container, this._pointsModel, this._filterModel);
      this._contentPresenter.init();
    }
    else{
      this._emptyComponent = new TripPointListEmptyView();
      render(this._container, this._emptyComponent, RenderPosition.BEFOREEND);
    }
  }

  destroy() {
    if(this._contentPresenter !== null) {
      this._contentPresenter.destroy();
      this._contentPresenter = null;
    }

    if(this._emptyComponent !== null) {
      remove(this._emptyComponent);
      this._emptyComponent = null;
    }
  }
}
