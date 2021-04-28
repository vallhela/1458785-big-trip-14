export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArray = (amount, factory) => {
  const result = [];
  for(let i = 0; i < amount; i++) {
    result.push(factory());
  }

  return result;
};

export const getRandomArrayItem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

export const updateArrayItemById = (array, updated) => {
  const index = array.findIndex((item) => item.id === updated.id);

  if (index === -1) {
    return array;
  }

  return [
    ...array.slice(0, index),
    updated,
    ...array.slice(index + 1),
  ];
};
