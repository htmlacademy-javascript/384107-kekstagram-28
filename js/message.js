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

const closeErrorMessage = () => {
  const errorPopup = document.querySelector('.error');
  const errorPopupButton = document.querySelector('.error__button');

  errorPopupButton.addEventListener('click', () => {
    errorPopup.remove();
  });
};

const closeSuccessMessage = () => {
  const successPopup = document.querySelector('.success');
  const successPopupButton = document.querySelector('.success__button');

  successPopupButton.addEventListener('click', () => {
    successPopup.remove();
  });
};

const createElement = (element) => {
  const alertContainer = element.cloneNode(true);
  document.body.append(alertContainer);
};

//Пошла стена функций для закрытия по Esc
// const onDocumentKeydownError = (evt) => {
//   if(isEscapeKey(evt)) {
//     evt.preventDefault();
//     console.log('1');
//     closeErrorMessage();
//     document.removeEventListener('keydown', onDocumentKeydownError);
//   }
// };

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const errorPopup = document.querySelector('.error');
    errorPopup.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const showErrorMessage = () => {
  createElement(errorMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  closeErrorMessage();
};

const onDocumentKeydownSuccess = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
    document.removeEventListener('keydown', onDocumentKeydownSuccess);
  }
};

const showSuccessMessage = () => {
  createElement(successMessage);
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  closeSuccessMessage();
};

const showErrorText = () => {
  createElement(errorAlert);
  const alertContainer = document.querySelector('.error-message');

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export { showErrorMessage, showSuccessMessage, showErrorText };
