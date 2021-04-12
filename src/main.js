import {createSiteMenuTemplate} from './view/site-menu.js';
import {createTripEventListTemplate} from './view/trip-event-list.js';
import {createTripFilterTemplate} from './view/trip-filter.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripSortTemplate} from './view/trip-sort.js';
import {generateTripEventItem} from './mock/mock-data.js';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateTripEventItem);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(tripMainElement, createTripInfoTemplate(), 'afterbegin');
render(tripControlsNavigationElement, createSiteMenuTemplate(), 'beforeend');
render(tripControlsFiltersElement, createTripFilterTemplate(), 'beforeend');
render(tripEventsElement, createTripSortTemplate(), 'beforeend');

render(tripEventsElement, createTripEventListTemplate(events), 'beforeend');
