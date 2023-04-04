import {isEscapeKey} from './util.js';

const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorAlert = document.querySelector('#error-message')
  .content
  .querySelector('.error-message');

const closeMessage = (popup, button) => {
  button.addEventListener('click', () => {
    popup.remove();
  });
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

const createElement = (element) => {
  const alertContainer = element.cloneNode(true);
  document.body.append(alertContainer);
};

const showFormPopup = (element) => {
  createElement(element);
  document.addEventListener('keydown', onDocumentKeydown);

  const popup = document.querySelector('.error, .success');
  const popupButton = document.querySelector('.error__button, .success__button');

  closeMessage(popup, popupButton);
};

const showErrorText = () => {
  createElement(errorAlert);
  const alertContainer = document.querySelector('.error-message');

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export { showErrorText, showFormPopup, errorMessage, successMessage};
