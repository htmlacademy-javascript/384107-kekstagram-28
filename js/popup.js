const bodyElement = document.querySelector('body');
const bigPictureContainer = bodyElement.querySelector('.big-picture');

const isEscapeKey = (evt) => evt.key === 'Escape';

const showPopup = () => {
  bigPictureContainer.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

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

export { showPopup, closePopup, onDocumentKeydown };
