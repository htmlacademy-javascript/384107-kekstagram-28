import { isEscapeKey, stopEventPropagation } from './util.js';
import { removeScale } from './scale.js';
import { removeEffects } from './slider.js';
import { sendData } from './api.js';
import { showFormPopup, errorMessage, successMessage, onOutsideClick } from './message.js';


const HASHTAG_REGULAR_EXPRESS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS_COUNT = 5;
const ERROR_TEXT = 'Введите не более 5 хештегов. Каждый должен начинаться с символа # и может содержать буквы или числа.';

const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const loadPhotoButton = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const closeOverlayButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const isValidHashtagCount = (tags) => tags.length <= MAX_HASHTAGS_COUNT;
const isValidHashtagSymbols = (tag) => HASHTAG_REGULAR_EXPRESS.test(tag);

const isUniqHashtag = (tags) => {
  const lowerCaseHashTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseHashTags.length === new Set(lowerCaseHashTags).size;
};

const validateHashtags = (value) => {
  const hashtags = value
    .trim()
    .split(' ')
    .filter(Boolean);

  return hashtags.every(isValidHashtagSymbols) && isValidHashtagCount(hashtags) && isUniqHashtag(hashtags);
};

pristine.addValidator(hashtagField, validateHashtags, ERROR_TEXT);

const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  pristine.reset();
  removeScale();
  removeEffects();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onOutsideClick);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.querySelector('.error') === null) {
      closeImgUploadOverlay();
    }
  }
}

const showImgUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(() => {
          showFormPopup(successMessage);
        })
        .catch(
          () => {
            showFormPopup(errorMessage);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

setUserFormSubmit(closeImgUploadOverlay);
hashtagField.addEventListener('keydown', stopEventPropagation);
commentField.addEventListener('keydown', stopEventPropagation);
loadPhotoButton.addEventListener('change', showImgUploadOverlay);
closeOverlayButton.addEventListener('click', closeImgUploadOverlay);
