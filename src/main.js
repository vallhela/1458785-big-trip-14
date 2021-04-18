import SiteMenuView from './view/site-menu.js';
import TripEventListView from './view/trip-event-list.js';
import TripFilterView from './view/trip-filter.js';
import TripInfoView from './view/trip-info.js';
import TripSortView from './view/trip-sort.js';
import TripEventItemView from './view/trip-event-item.js';
import {render, RenderPosition} from './view/utils.js';
import {generateTripEventItem} from './mock/mock-data.js';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateTripEventItem);

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(tripMainElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsNavigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);

const tripEventListView = new TripEventListView();

render(tripEventsElement, tripEventListView.getElement(), RenderPosition.BEFOREEND);

events.map((evt, index) => render(tripEventListView.getElement(), new TripEventItemView(evt, {index}).getElement(), RenderPosition.BEFOREEND));
