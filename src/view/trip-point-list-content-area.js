import AbstractView from './abstract.js';

const createTemplate = () => {
  return `<ul class="trip-events__list">
</ul>
`;
};

export default class TripPointListContentArea extends AbstractView {
  getTemplate() {
    return createTemplate();
  }
}
