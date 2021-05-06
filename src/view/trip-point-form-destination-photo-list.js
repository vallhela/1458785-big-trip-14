import Abstract from './abstract';

const createPhotoTemplate = (photo) => {
  return `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;
};

const createTemplate = (photos) => {
  return `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${photos.map((photo) => createPhotoTemplate(photo)).join('')}
  </div>
</div>`;
};

export default class TripPointFormDestinationPhotoList extends Abstract {
  constructor(photos) {
    super();

    this._photos = photos;
  }

  getTemplate() {
    return createTemplate(this._photos);
  }
}
