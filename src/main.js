import SiteMenuView from './view/site-menu.js';
import TripFilterView from './view/trip-filter.js';
import TripInfoView from './view/trip-info.js';
import {render, RenderPosition} from './utils/render.js';
import {generateTripEventItem} from './mock/mock-data.js';

import TripEventListPresenter from './presenter/trip-point-list';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateTripEventItem);

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

if (events && events.length > 0) {
  render(tripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
  render(tripControlsNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);
  render(tripControlsFiltersElement, new TripFilterView(), RenderPosition.BEFOREEND);
}

const tripEventListPresenter = new TripEventListPresenter(tripEventsElement);
tripEventListPresenter.init(events);
