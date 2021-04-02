import {createSiteMenuTemplate} from './view/site-menu.js';
import {createTripEventListTemplate} from './view/trip-event-list.js';
import {createTripEventTemplate} from './view/trip-event.js';
import {createTripFilterTemplate} from './view/trip-filter.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripSortTemplate} from './view/trip-sort.js';
import {createEditFormTemplate} from './view/edit-form.js';

const EVENT_COUNT = 3;

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

const listItems = [createEditFormTemplate()];
for(let i = 0; i < EVENT_COUNT; i++) {
  listItems.push(createTripEventTemplate());
}

render(tripEventsElement, createTripEventListTemplate(listItems), 'beforeend');
