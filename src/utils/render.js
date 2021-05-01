import AbstractView from '../view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const getElement = (item) => {
  if(item === null) {
    return null;
  }

  return item instanceof AbstractView ? item.getElement() : item;
};

export const render = (container, child, place) => {
  const containerElement = getElement(container);
  const childElement = getElement(child);

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      containerElement.prepend(childElement);
      break;
    case RenderPosition.BEFOREEND:
      containerElement.append(childElement);
      break;
    default:
      throw new Error('Given place is not supported.');
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (oldChild, newChild) => {
  const oldElement = getElement(oldChild);
  const newElement = getElement(newChild);
  if (oldElement === null || newElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const parentElement = oldElement.parentElement;
  if(parentElement === null) {
    throw new Error('Old child has no parent.');
  }

  parentElement.replaceChild(newElement, oldElement);
};

export const remove = (child) => {
  const element = getElement(child);
  element.remove();
};

export const contains = (parent, child) => {
  const parentElement = getElement(parent);
  const childElement = getElement(child);

  if(parentElement === null || childElement === null) {
    return false;
  }

  return parentElement.contains(childElement);
};

export const tryReplace = (oldChild, newChild) => {
  const oldElement = getElement(oldChild);
  const newElement = getElement(newChild);
  if(oldElement === null) {
    return false;
  }

  const parentElement = oldElement.parentElement;
  if(parentElement === null) {
    return false;
  }

  if(newElement === null) {
    remove(oldElement);
  }
  else{
    parentElement.replaceChild(newElement, oldElement);
  }

  return true;
};
