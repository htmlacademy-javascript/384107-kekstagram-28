import { renderFullPhoto } from './full-size-photo.js';
import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');
const bigPictureContainer = bodyElement.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');

const closePopup = () => {
  bigPictureContainer.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const showPopup = (url, likes, comments) => {
  bigPictureContainer.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  renderFullPhoto(url, likes, comments);
  document.addEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener('click', () => closePopup());

export { showPopup };
