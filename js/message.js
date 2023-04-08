import { isEscapeKey } from './util.js';

const SHOW_MESSAGE_TIME = 5000;

const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorAlert = document.querySelector('#error-message')
  .content
  .querySelector('.error-message');

const closePopup = () => {
  const popup = document.querySelector('.error, .success');
  popup.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

function onOutsideClick (evt) {
  const popup = document.querySelector('.error, .success');
  if (evt.target === popup) {
    closePopup();
  }
  document.removeEventListener('click', onOutsideClick);
}

const createElement = (element) => {
  const alertContainer = element.cloneNode(true);
  document.body.append(alertContainer);
};

const showFormPopup = (element) => {
  createElement(element);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);

  const popupButton = document.querySelector('.error__button, .success__button');
  popupButton.addEventListener('click', closePopup);
};

const showErrorText = () => {
  createElement(errorAlert);
  const alertContainer = document.querySelector('.error-message');

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_MESSAGE_TIME);
};

export {
  showErrorText,
  showFormPopup,
  errorMessage,
  successMessage,
  onOutsideClick
};
