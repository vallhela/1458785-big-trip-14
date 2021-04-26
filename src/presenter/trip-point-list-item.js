import TripPointCardView from '../view/trip-event';
import TripPointFormView from '../view/trip-point-form';

import TripPointListItemView from '../view/trip-point-list-item';

import { render, RenderPosition, replace } from '../utils/render';

export default class TripPointListItem {
  constructor(container) {
    this.init = this.init.bind(this);
    this._renderCard = this._renderCard.bind(this);
    this._renderForm = this._renderForm.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);

    this._container = container;

    this._component = new TripPointListItemView();

    this._cardComponent = null;
    this._formComponent = null;
  }

  init(point) {
    this._point = point;

    this._cardComponent = new TripPointCardView(point);
    this._cardComponent.setClickHandler(this._renderForm);

    this._formComponent = new TripPointFormView(point);
    this._formComponent.setClickHandler(this._renderCard);

    render(this._component, this._cardComponent, RenderPosition.BEFOREEND);
    render(this._container, this._component, RenderPosition.BEFOREEND);
  }

  _renderCard() {
    document.removeEventListener('keydown', this._handleKeyDown);
    replace(this._formComponent, this._cardComponent);
  }

  _renderForm() {
    document.addEventListener('keydown', this._handleKeyDown);
    replace(this._cardComponent, this._formComponent);
  }

  _handleKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._renderCard();
    }
  }
}
