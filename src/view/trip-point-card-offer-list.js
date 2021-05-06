import {createOfferListItemTemplate} from './trip-point-card-offer-item.js';

export const createOfferListTemplate = (offers) => {
  if (!offers || offers.length == 0) {
    return '';
  }

  return `<h4 class="visually-hidden">Offers:</h4>
<ul class="event__selected-offers">
  ${offers.map((offer) => createOfferListItemTemplate(offer)).join(' ')}
</ul>
`;
};
