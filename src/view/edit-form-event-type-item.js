export const createEditFromEventTypeListItemTemplate = (evtType, options) => {
  const index = options.index;
  const lowered = evtType.toLowerCase();
  const inputId = `${lowered}-${index}`;
  const checked = options.isChecked
    ? 'checked'
    : '';

  return `
<div class="event__type-item">
  <input id="event-type-${inputId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowered}" ${checked}>
  <label class="event__type-label  event__type-label--${lowered}" for="event-type-${inputId}">${evtType}</label>
</div>
`;
};
