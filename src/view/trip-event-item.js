import {createTripEventTemplate} from './trip-event.js';
import {createEditFormTemplate} from './edit-form.js';

export const createTripEventListItemTemplate = (evt, options) => {
  const markup = options && options.mode == 'edit'
    ? createEditFormTemplate(evt, { index: options.index})
    : createTripEventTemplate(evt);

  return `<li class="trip-events__item">
  ${markup}
</li>
`;
};
