import SiteMenuView from './view/site-menu.js';
import TripEventListView from './view/trip-event-list.js';
import TripFilterView from './view/trip-filter.js';
import TripInfoView from './view/trip-info.js';
import TripSortView from './view/trip-sort.js';
import TripEventItemView from './view/trip-event-item.js';
import NoEventView from './view/no-event.js';
import {render, RenderPosition} from './utils/render.js';
import {generateTripEventItem} from './mock/mock-data.js';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateTripEventItem);

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

if (events.length === 0) {
  render(tripEventsElement, new NoEventView(), RenderPosition.BEFOREEND);
} else {
  render(tripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
  render(tripControlsNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);
  render(tripControlsFiltersElement, new TripFilterView(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new TripSortView(), RenderPosition.BEFOREEND);
}

const tripEventListView = new TripEventListView();
render(tripEventsElement, tripEventListView, RenderPosition.BEFOREEND);
events.map((evt, index) => render(tripEventListView, new TripEventItemView(evt, {index}), RenderPosition.BEFOREEND));


