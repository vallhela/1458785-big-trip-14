import AbstractView from './abstract.js';

const createTemplate = () => {
  return `<li class="trip-events__item">
</li>
`;
};

export default class TripPointListItem extends AbstractView {
  getTemplate() {
    return createTemplate();
  }
}
