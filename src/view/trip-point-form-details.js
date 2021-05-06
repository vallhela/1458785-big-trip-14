import AbstractView from './abstract.js';

export const createTemplate = () => {
  return `<section class="event__details">
</section>
`;
};

export default class TripPointFormDetails extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTemplate();
  }
}


