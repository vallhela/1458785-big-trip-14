import {createEditFormOfferSelectorTemplate} from './edit-form-event-offer-selector.js';

export const createEditFromOfferListTemplate = (offers, options) => {
  if(!offers || offers.length == 0) {
    return '';
  }

  return `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
      ${offers.map((offer) => createEditFormOfferSelectorTemplate(offer, { index: options.index, isChecked: true }))}
  </div>
</section>`;
};
