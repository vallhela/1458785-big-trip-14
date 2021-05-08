import AbstractView from './abstract.js';

const createTemplate = () => {
  return '<h2 class="visually-hidden">Filter events</h2>';
};

export default class TripPointFilterHeader extends AbstractView {
  getTemplate() {
    return createTemplate();
  }
}
