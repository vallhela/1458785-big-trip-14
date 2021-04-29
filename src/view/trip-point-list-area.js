import AbstractView from './abstract.js';

const createTemplate = () => {
  return `<ul class="trip-events__list">
</ul>
`;
};

export default class TripPointListArea extends AbstractView {
  getTemplate() {
    return createTemplate();
  }
}
