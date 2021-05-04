import Abstract from './abstract.js';
import TripPointFormOfferListItemView from './trip-point-form-offer-item.js';

import {render, RenderPosition} from '../utils/render.js';

export const createTemplate = () => {
  return `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  </div>
</section>`;
};

export default class TripPointFormOfferList extends Abstract {
  constructor(offers, checkedChanged) {
    super();

    this._offers = offers;
    this._checkedChanged = checkedChanged;
  }

  getTemplate() {
    return createTemplate();
  }

  _onElementCreated(element) {
    const containerComponent = element.querySelector('.event__available-offers');
    this._offers.map((offer) => {
      const itemComponent = new TripPointFormOfferListItemView(offer, this._checkedChanged);

      render(containerComponent, itemComponent, RenderPosition.BEFOREEND);
    });
  }
}
