import {createTripEventListItemTemplate} from './trip-event-item.js';

export const createTripEventListTemplate = (items) => {
  return `<ul class="trip-events__list">
  ${items.map((item) => createTripEventListItemTemplate(item))}
</ul>`;
};
