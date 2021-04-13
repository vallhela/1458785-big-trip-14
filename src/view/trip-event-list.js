import {createTripEventListItemTemplate} from './trip-event-item.js';

export const createTripEventListTemplate = (events) => {
  return `<ul class="trip-events__list">
  ${events.map((evt, index) => createTripEventListItemTemplate(evt, { mode: index == 0? 'edit': null, index })).join(' ')}
</ul>
`;
};
