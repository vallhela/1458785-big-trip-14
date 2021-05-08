import SiteMenuView from './view/site-menu.js';
import TripInfoView from './view/trip-info.js';
import {render, RenderPosition} from './utils/render.js';
import {generateTripEventItem} from './mock/mock-data.js';

import TripEventListPresenter from './presenter/trip-point-list.js';
import TripPointFilterPresenter from './presenter/trip-point-filter.js';

import TripPointFilterModel from './model/trip-point-filter.js';
import TripPointsModel from './model/trip-points.js';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateTripEventItem);

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const tripPointsModel = new TripPointsModel();
tripPointsModel.setPoints(events);

const tripPointFilterModel = new TripPointFilterModel();

if (events && events.length > 0) {
  render(tripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
  render(tripControlsNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);
  const tripPointFilterPresenter = new TripPointFilterPresenter(tripControlsFiltersElement, tripPointFilterModel);
  tripPointFilterPresenter.init();
}

const tripEventListPresenter = new TripEventListPresenter(tripEventsElement, tripPointsModel, tripPointFilterModel);
tripEventListPresenter.init(events);
