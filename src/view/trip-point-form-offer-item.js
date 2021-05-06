import AbstractView from './abstract.js';

export const createTemplate = (offer) => {
  const type = offer.type.toLowerCase();
  const checked = offer.isChecked
    ? 'checked'
    : '';

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}" type="checkbox" name="event-offer-${type}}" ${checked}>
  <label class="event__offer-label" for="event-offer-${type}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`;
};

export default class TripPointFormOfferListItem extends AbstractView {
  constructor(offer, checkedChanged) {
    super();

    this._offer = offer;
    this._checkedChanged = checkedChanged;
  }

  getTemplate() {
    return createTemplate(this._offer);
  }

  _onElementCreated(element) {
    const inputComponent = element.querySelector('.event__offer-checkbox');
    inputComponent.addEventListener('click', this._clickHandler);
  }

  _clickHandler(evt) {
    if(this._checkedChanged === undefined || this._checkedChanged === null) {
      return;
    }

    this._checkedChanged({offer: this._offer, checked: evt.target.checked});
  }
}
