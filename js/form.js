import { isEscapeKey, stopEventPropagation } from './util.js';
import { removeScale } from './scale.js';
import { removeEffects } from './slider.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';


const HASHTAG_REGULAR_EXPRESS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS_COUNT = 5;
const ERROR_TEXT = 'Введите не более 5 хештегов. Каждый должен начинаться с символа # и может содержать буквы или числа.';

const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const loadPhotoButton = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const closeOverlayButton = form.querySelector('.img-upload__cancel');

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
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUploadOverlay();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const showImgUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      sendData(formData, closeImgUploadOverlay, showSuccessMessage, showErrorMessage);
    }
  });
};

setUserFormSubmit();
hashtagField.addEventListener('keydown', stopEventPropagation);
commentField.addEventListener('keydown', stopEventPropagation);
loadPhotoButton.addEventListener('change', showImgUploadOverlay);
closeOverlayButton.addEventListener('click', closeImgUploadOverlay);
