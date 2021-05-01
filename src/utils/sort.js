export const compareForNull = (left, right) => {
  if (left === null && right === null) {
    return 0;
  }

  if (left === null) {
    return 1;
  }

  if (right === null) {
    return -1;
  }

  return null;
};

export const inverse = (sorter) => {
  return (left, right) => sorter(left, right) * (-1);
};
