import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger, getRandomArray, getRandomArrayItem} from '../utils/common.js';

const getRandomTime = (options = null) => {
  if(options && options.canBeNull){
    const shouldBeNull = Boolean(getRandomInteger(0, 1));
    if(shouldBeNull) {
      return {dateFrom: null, dateTo: null};
    }
  }

  const maxDaysGap = 7;
  const maxMinutesGap = 11 * 60;

  const dateFrom = dayjs()
    .add(getRandomInteger(-maxDaysGap, maxDaysGap), 'day')
    .add(getRandomInteger(0, maxMinutesGap), 'minute')
    .toDate();

  const dateTo = dayjs(dateFrom)
    .add(getRandomInteger(0, maxMinutesGap), 'minute')
    .toDate();

  return {dateFrom, dateTo};
};

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const generateRandomPicture = () => {
  return {
    'description': getRandomArrayItem(descriptions),
    'src': `http://picsum.photos/248/152?r=${getRandomInteger(1, 55)}`,
  };
};

const generateRandomDestination = (city) => {
  return {
    'name': city,
    'description': getRandomArray(getRandomInteger(1, 5), () => getRandomArrayItem(descriptions)).join(' '),
    'pictures': getRandomArray(getRandomInteger(1, 5), generateRandomPicture),
  };
};

const destinations = [
  'Ostin',
  'Washington',
  'Berlin',
  'Moscow',
  'Texas',
  'Rome',
  'Osaka',
].map((city) => generateRandomDestination(city));

const generateOffer = () => {
  return {
    'type': getRandomArrayItem(['luggage', 'comfort', 'meal', 'seats', 'train']),
    'title': 'Offer '+ getRandomInteger(1, 70),
    'price': getRandomInteger(10, 550),
  };
};

const generateRandomOffers = () => getRandomArray(getRandomInteger(0, 5), generateOffer);
const generateEventType = (type) => {
  return {
    type: type,
    offers: generateRandomOffers(),
  };
};

const eventTypes = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Transport',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
].map((type) => generateEventType(type));

export const generateTripEventItem = () => {
  const time = getRandomTime();
  const eventType = getRandomArrayItem(eventTypes);
  return {
    id: nanoid(),
    dateFrom: time.dateFrom,
    dateTo: time.dateTo,
    type: eventType.type,
    destination: getRandomArrayItem(destinations),
    offers: eventType.offers,
    price: getRandomInteger(1, 1000),
  };
};

export const getAllEventTypes = () => {
  return eventTypes.slice();
};

export const getAllDestinations = () => {
  return destinations.slice();
};
