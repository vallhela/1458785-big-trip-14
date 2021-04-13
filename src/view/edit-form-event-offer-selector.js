export const createEditFormOfferSelectorTemplate = (offer, options) => {
  const type = offer.type.toLowerCase();
  const index = options.index;
  const checked = options.isChecked
    ? 'checked'
    : '';

  return `
<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${index}" type="checkbox" name="event-offer-${type}}" ${checked}>
  <label class="event__offer-label" for="event-offer-${type}-${index}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`;
};
