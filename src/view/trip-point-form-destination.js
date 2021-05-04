import AbstractView from './abstract';

export const createTemplate = (destination) => {
  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destination.description}</p>
</section>`;
};

export default class TripPointFormDestination extends AbstractView {
  constructor(destination) {
    super();

    this._destination = destination;
  }

  getTemplate() {
    return createTemplate(this._destination);
  }
}
