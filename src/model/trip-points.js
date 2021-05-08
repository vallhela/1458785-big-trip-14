import Observable from '../utils/observable';

export const TripPointsModelEventType = {
  ADDED: 'added',
  REMOVED: 'removed',
  UPDATED: 'updated',
  REFRESHED: 'refreshed',
};

export default class TripPointsModel extends Observable {
  constructor() {
    super();

    this.getPoints = this.getPoints.bind(this);
    this.setPoints = this.setPoints.bind(this);
    this.hasPoints = this.hasPoints.bind(this);

    this._points = [];
  }

  getPoints() {
    return this._points.slice();
  }

  setPoints(value) {
    if(value === undefined || value === null) {
      throw new Error('Value is invalid.');
    }

    this._points = value.slice();
    this._notify(TripPointsModelEventType.REFRESHED, value);
  }

  hasPoints() {
    return this._points && this._points.length > 0;
  }

  addPoint(point) {
    this._points = [
      point,
      ...this._points,
    ];

    this._notify(TripPointsModelEventType.ADDED, point);
  }

  removePoint(point) {
    const index = this._points.findIndex((p) => p.id === point.id);
    if (index === -1) {
      throw new Error('Can\'t remove abscent point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(TripPointsModelEventType.REMOVED, point);
  }

  updatePoint(point) {
    const index = this._points.findIndex((p) => p.id === point.id);

    if (index === -1) {
      throw new Error('Can\'t remove abscent point');
    }

    this._points = [
      ...this._points.slice(0, index),
      point,
      ...this._points.slice(index + 1),
    ];

    this._notify(TripPointsModelEventType.UPDATED, point);
  }
}
