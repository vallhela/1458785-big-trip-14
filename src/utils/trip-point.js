import dayjs from 'dayjs';

import {TripPointListContentFilterType, TripPointListContentSortType} from '../const';
import {compareForNull} from './sort';

export const sortByDay = (left, right) => {
  const compared = compareForNull(left.dateFrom, right.dateFrom);
  if(compared !== null) {
    return compared;
  }

  return dayjs(left.dateFrom).diff(dayjs(right.dateFrom));
};

const getEvent = (point) => {
  return point ? point.type : null;
};

export const sortByEvent = (left, right) => {
  const leftEvent = getEvent(left);
  const rightEvent = getEvent(right);

  const compared = compareForNull(leftEvent, rightEvent);
  if(compared !== null) {
    return compared;
  }

  if(leftEvent < rightEvent) {
    return -1;
  }

  if(leftEvent > rightEvent) {
    return 1;
  }

  return 0;
};

const getTime = (point) => {
  if(point.dateFrom === null || point.dateTo === null) {
    return null;
  }

  return dayjs(point.dateTo).diff(dayjs(point.dateFrom));
};

export const sortByTime = (left, right) => {
  const leftTime = getTime(left);
  const rightTime = getTime(right);

  const compared = compareForNull(leftTime, rightTime);
  if(compared !== null) {
    return compared;
  }

  return leftTime - rightTime;
};

export const sortByPrice = (left, right) => {
  const leftPrice = left.price;
  const rightPrice = right.price;

  const compared = compareForNull(leftPrice, rightPrice);
  if(compared !== null) {
    return compared;
  }

  return leftPrice - rightPrice;
};

const getOffers = (point) => {
  return point && point.offers ? point.offers.length : null;
};

export const sortByOffers = (left, right) => {
  const leftOffers = getOffers(left);
  const rightOffers = getOffers(right);

  const compared = compareForNull(leftOffers, rightOffers);
  if(compared !== null) {
    return compared;
  }

  return leftOffers - rightOffers;
};

export const getSorter = (sortType) => {
  switch(sortType) {
    case TripPointListContentSortType.DAY: return sortByDay;
    case TripPointListContentSortType.EVENT: return sortByEvent;
    case TripPointListContentSortType.TIME: return sortByTime;
    case TripPointListContentSortType.PRICE: return sortByPrice;
    case TripPointListContentSortType.OFFER: return sortByOffers;
    default: throw new Error('Unsupported sortType');
  }
};

export const filterPast = (points) => {
  const now = dayjs();
  return points.filter(
    (point) => {
      const date = point.dateFrom;
      const compared = compareForNull(date, now);
      if(compared !== null) {
        return false;
      }

      return dayjs(date).diff(now) < 0;
    });
};

export const filterFuture = (points) => {
  const now = dayjs();
  return points.filter(
    (point) => {
      const date = point.dateFrom;
      const compared = compareForNull(date, now);
      if(compared !== null) {
        return false;
      }

      return dayjs(now).diff(date) < 0;
    });
};

export const getFilter = (filterType) => {
  switch(filterType) {
    case TripPointListContentFilterType.FUTURE: return filterFuture;
    case TripPointListContentFilterType.PAST: return filterPast;
    default: return (points) => points;
  }
};
