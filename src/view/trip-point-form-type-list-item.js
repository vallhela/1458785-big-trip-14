import AbstractView from './abstract.js';

const createTemplate = (pointType, isChecked) => {
  const lowered = pointType.toLowerCase();
  const inputId = `${lowered}`;
  const checked = isChecked
    ? 'checked'
    : '';

  return `<div class="event__type-item">
  <input id="event-type-${inputId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowered}" ${checked} data-point-type="${pointType}">
  <label class="event__type-label  event__type-label--${lowered}" for="event-type-${inputId}">${pointType}</label>
</div>
`;
};

export default class TripPointFormTypeListItem extends AbstractView {
  constructor(pointType, isChecked) {
    super();

    this._pointType = pointType;
    this._isChecked = isChecked;

    this._checkedChangeHandler = this._checkedChangeHandler.bind(this);
    this.setCheckedChangeHandler = this.setCheckedChangeHandler.bind(this);
  }

  getTemplate() {
    return createTemplate(this._pointType, this._isChecked);
  }

  _onElementCreated(element) {
    const component = element.querySelector('.event__type-input');
    component.addEventListener('change', this._checkedChangeHandler);
  }

  _checkedChangeHandler(evt) {
    if(this._callback.checkedChange === undefined || this._callback.checkedChange === null) {
      return;
    }

    this._callback.checkedChange(evt.target.dataset.pointType);
  }

  setCheckedChangeHandler(callback) {
    this._callback.checkedChange = callback;
  }
}
