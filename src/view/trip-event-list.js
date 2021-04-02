const createTripEventListItemTemplate = (item) => {
  return `<li class="trip-events__item">
  ${item}
</li>

`;
};

export const createTripEventListTemplate = (items) => {
  return `<ul class="trip-events__list">
  ${items.map((item) => createTripEventListItemTemplate(item))}
</ul>`;
};
