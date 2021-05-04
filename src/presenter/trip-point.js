import TripPointCardView from '../view/trip-point-card';
import TripPointFormView from '../view/trip-point-form';

import {remove, render, RenderPosition, replace} from '../utils/render';

export default class TripPoint {
  constructor(container, changeData, beforeFormShown) {
    this.init = this.init.bind(this);
    this._renderCard = this._renderCard.bind(this);
    this._renderForm = this._renderForm.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._tryReplace = this._tryReplace.bind(this);
    this._contains = this._contains.bind(this);

    this._container = container;
    this._changeData = changeData;
    this._beforeFormShown = beforeFormShown;

    this._cardComponent = null;
    this._formComponent = null;
  }

  init(point) {
    const cardComponent = new TripPointCardView(point);
    cardComponent.setOpenEditClickHandler(this._renderForm);
    cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    const formComponent = new TripPointFormView(point);
    formComponent.setClickHandler(this._renderCard);
    formComponent.setFormSubmitHandler(this._handleFormSubmit);

    this._tryReplace(this._cardComponent, cardComponent);
    this._tryReplace(this._formComponent, formComponent);

    if(this._point === undefined) {
      render(this._container, cardComponent, RenderPosition.BEFOREEND);
    }

    this._point = point;
    this._cardComponent = cardComponent;
    this._formComponent = formComponent;
  }

  showCard() {
    if(this._cardComponent !== null && this._formComponent !== null && this._contains(this._formComponent)){
      this._renderCard();
    }
  }

  destroy() {
    if(this._cardComponent !== null) {
      remove(this._cardComponent);
      this._cardComponent = null;
    }

    if(this._formComponent !== null) {
      remove(this._formComponent);
      this._formComponent = null;
    }
  }

  _tryReplace(oldComponent, newComponent) {
    if(oldComponent !== null) {
      if(this._contains(oldComponent)) {
        replace(oldComponent, newComponent);
      }

      remove(oldComponent);
    }
  }

  _contains(component) {
    if(component === null) {
      return false;
    }

    const result = this._container.getElement().contains(component.getElement());
    return result;
  }

  _renderCard() {
    document.removeEventListener('keydown', this._handleKeyDown);
    this._formComponent.reset(this._point);
    replace(this._formComponent, this._cardComponent);
  }

  _renderForm() {
    this._beforeFormShown();
    document.addEventListener('keydown', this._handleKeyDown);
    replace(this._cardComponent, this._formComponent);
  }

  _handleKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._renderCard();
    }
  }

  _handleFavoriteClick() {
    const data = Object.assign(
      {},
      this._point,
      {
        isFavorite: !this._point.isFavorite,
      },
    );

    this._changeData(data);
  }

  _handleFormSubmit(point) {
    this._changeData(point);
    this._renderCard();
  }
}
