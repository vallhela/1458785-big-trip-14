import {createEditFromEventTypeListItemTemplate} from './edit-form-event-type-item.js';
import {getAllEventTypes} from '../mock/mock-data.js';

export const createEditFromEventTypeListTemplate = (options) => {
  const createItemMarkup =
    (eventType) => createEditFromEventTypeListItemTemplate(
      eventType,
      {
        index: options.index,
        isChecked: eventType == options.selected,
      },
    );

  const eventTypes = getAllEventTypes();
  return `<div class="event__type-list">
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${eventTypes.map((eventType) => createItemMarkup(eventType)).join('')}
  </fieldset>
</div>`;
};
