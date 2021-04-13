import {createEditFromOfferListTemplate} from './edit-form-event-offer-list';
import {createEditFormDestinationTemplate} from './edit-form-event-destination.js';

export const createEditFormDetailsTemplate = (evt, options) => {
  const offerListMarkup = createEditFromOfferListTemplate(evt.offers, {index: options.index});
  const destinationMarkup = createEditFormDestinationTemplate(evt.destination);

  if(offerListMarkup === '' && destinationMarkup === '') {
    return '';
  }

  return `<section class="event__details">
  ${offerListMarkup}
  ${destinationMarkup}
</section>
`;
};
