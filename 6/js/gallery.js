import { createPhotos } from './data.js';
import { showPopup, closePopup, onDocumentKeydown } from './popup.js';
import { renderFullSizePhoto } from './full-size-photo.js';

const picturesContainer = document.querySelector('.pictures');
const closeButton = document.querySelector('.big-picture__cancel');
const photos = createPhotos();

const onThumbnailClick = (evt) => {
  if(evt.target.closest('.picture__img')) {
    showPopup();

    const suitablePhoto = photos.find((photo) => photo.id === +evt.target.dataset.id);
    renderFullSizePhoto(suitablePhoto);

    document.addEventListener('keydown', onDocumentKeydown);
  }
};

closeButton.addEventListener('click', () => closePopup());

picturesContainer.addEventListener('click', onThumbnailClick);

export { photos };
