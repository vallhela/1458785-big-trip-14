import AbstractView from './abstract.js';

const createTemplate = () => {
  return `<li class="trip-events__item">
</li>
`;
};

export default class TripPointListContentItem extends AbstractView {
  getTemplate() {
    return createTemplate();
  }
}
