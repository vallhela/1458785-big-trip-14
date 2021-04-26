import AbstractView from './abstract.js';

const createTemplate = () => {
  return `<p class="trip-events__msg">
  Click New Event to create your first point
</p>`;
};

export default class TripPointListEmpty extends AbstractView {
  getTemplate() {
    return createTemplate();
  }
}
