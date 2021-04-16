import {createEditFromOfferListTemplate} from './edit-form-event-offer-list';
import {createEditFormEventDestinationTemplate} from './edit-form-event-destination.js';

export const createEditFormEventDetailsTemplate = (evt, options) => {
  const offerListMarkup = createEditFromOfferListTemplate(evt.offers, {index: options.index});
  const destinationMarkup = createEditFormEventDestinationTemplate(evt.destination);

  if(offerListMarkup === '' && destinationMarkup === '') {
    return '';
  }

  return `<section class="event__details">
  ${offerListMarkup}
  ${destinationMarkup}
</section>
`;
};
