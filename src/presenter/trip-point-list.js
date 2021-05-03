import TripPointListEmptyView from '../view/trip-point-list-empty';

import TripPointListContentPresenter from './trip-point-list-content';

import { render, RenderPosition, remove} from '../utils/render';

export default class TripPointList {
  constructor(container) {
    this.init = this.init.bind(this);
    this._resetContentPresenter = this._resetContentPresenter.bind(this);
    this._resetEmptyComponent = this._resetEmptyComponent.bind(this);

    this._container = container;

    this._emptyComponent = null;
    this._contentPresenter = null;
  }

  init(points) {
    this._resetEmptyComponent();
    this._resetContentPresenter();

    if(points && points.length > 0) {
      this._contentPresenter = new TripPointListContentPresenter(this._container);
      this._contentPresenter.init(points);
    }
    else{
      this._emptyComponent = new TripPointListEmptyView();
      render(this._container, this._emptyComponent, RenderPosition.BEFOREEND);
    }
  }

  _resetContentPresenter() {
    if(this._contentPresenter !== null) {
      this._contentPresenter.destroy();
      this._contentPresenter = null;
    }
  }

  _resetEmptyComponent() {
    if(this._emptyComponent !== null) {
      remove(this._emptyComponent);
      this._emptyComponent = null;
    }
  }
}
