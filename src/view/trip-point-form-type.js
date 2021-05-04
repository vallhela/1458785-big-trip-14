import AbstractView from './abstract.js';
import TripPointFormTypeListItemView from './trip-point-form-type-list-item.js';

import { render, RenderPosition } from '../utils/render.js';

const createTemplate = (pointType) => {
  return `<div class="event__type-wrapper">
  <label class="event__type  event__type-btn" for="event-type-toggle">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
  </label>
  <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox">
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
    </fieldset>
  </div>
</div>`;
};

export default class TripPointFormType extends AbstractView {
  constructor(pointTypes, selected) {
    super();

    this._checkedChangeHandler = this._checkedChangeHandler.bind(this);
    this.setSelectedChangeHandler = this.setSelectedChangeHandler.bind(this);

    this._pointTypes = pointTypes;
    this._selected = selected;
  }

  getTemplate() {
    return createTemplate(this._selected);
  }

  _onElementCreated(element) {
    const groupComponent = element.querySelector('.event__type-group');
    this._pointTypes.map((pointType) => {
      const component = new TripPointFormTypeListItemView(pointType, pointType === this._selected);
      component.setCheckedChangeHandler(this._checkedChangeHandler);

      render(groupComponent, component, RenderPosition.BEFOREEND);
    });
  }

  _checkedChangeHandler(checkedPointType) {
    if(this._callback.selectedChange === undefined || this._callback.selectedChange === null) {
      return;
    }

    if(this._selected === checkedPointType) {
      return;
    }

    this._callback.selectedChange(checkedPointType);
  }

  setSelectedChangeHandler(callback) {
    this._callback.selectedChange = callback;
  }
}
