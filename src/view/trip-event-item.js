import TripEventView from './trip-event.js';
import EditFormView from './edit-form.js';
import {render, RenderPosition, replace} from '../utils/render.js';
import AbstractView from './abstract.js';

const createTripEventListItemTemplate = () => {
  return `<li class="trip-events__item">
</li>
`;
};

export default class TripEventItem extends AbstractView {
  constructor(evt, options) {
    super();
    this._editForm = new EditFormView(evt, options);
    this._tripEvent = new TripEventView(evt);

    const onEscKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        renderEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const renderForm = () => {
      document.addEventListener('keydown', onEscKeyDown);
      replace(this._editForm.getElement(), this._tripEvent.getElement());
    };

    const renderEvent = () => {
      document.removeEventListener('keydown', onEscKeyDown);
      replace(this._tripEvent.getElement(), this._editForm.getElement());
    };

    this._tripEvent.setClickHandler(() => {
      renderForm();
    });

    this._editForm.setClickHandler(() => {
      renderEvent();
    });

  }

  getTemplate() {
    return createTripEventListItemTemplate();
  }

  _onElementCreated(element) {
    render(element, this._tripEvent.getElement(), RenderPosition.BEFOREEND);
  }
}
