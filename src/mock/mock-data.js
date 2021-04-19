import dayjs from 'dayjs';
import {getRandomInteger, getRandomArray, getRandomArrayItem} from '../utils/common.js';

const getRandomDate = (options = null) => {
  if(options && options.canBeNull){
    const shouldBeNull = Boolean(getRandomInteger(0, 1));
    if(shouldBeNull) {
      return null;
    }
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
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
];

const cities = [
  'Ostin',
  'Washington',
  'Berlin',
  'Moscow',
  'Texas',
  'Rome',
  'Osaka',
];

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

const generateRandomDestination = () => {
  return {
    'name': getRandomArrayItem(cities),
    'description': getRandomArray(getRandomInteger(1, 5), () => getRandomArrayItem(descriptions)).join(' '),
    'pictures': getRandomArray(getRandomInteger(1, 5), generateRandomPicture),
  };
};

const generateOffer = () => {
  return {
    'type': getRandomArrayItem(['luggage', 'comfort', 'meal', 'seats', 'train']),
    'title': 'Offer '+ getRandomInteger(1, 70),
    'price': getRandomInteger(10, 550),
  };
};

export const generateTripEventItem = () => {
  return {
    dateFrom: getRandomDate(),
    dateTo: getRandomDate(),
    type: getRandomArrayItem(eventTypes),
    destination: generateRandomDestination(),
    offers: getRandomArray(getRandomInteger(0, 5), generateOffer),
    price: getRandomInteger(1, 1000),
  };
};

export const getAllEventTypes = () => {
  return eventTypes.slice();
};
