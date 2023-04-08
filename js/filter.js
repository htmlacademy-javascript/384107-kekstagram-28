import { renderThumbnails } from './thumbnails.js';
import { sortRandomly } from './util.js';
const PHOTO_COUNT = 10;
const RERENDER_DELAY = 500;

const filterContainer = document.querySelector('.img-filters');

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

filterContainer.classList.remove('img-filters--inactive');

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const changeActiveClass = (evt) => {
  if (!evt.target.classList.contains('img-filters__button--active')) {
    filterContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  }
};

const getFilteredPhotos = (id, photos) => {
  switch (id) {
    case 'filter-default':
      return [...photos];
    case 'filter-random':
      return [...photos].sort(sortRandomly).slice(0, PHOTO_COUNT);
    case 'filter-discussed':
      return [...photos].sort(sortByComments);
  }
};

const sortPhoto = (photos) => {
  filterContainer.addEventListener('click', (evt) => {
    if(evt.target.matches('button')) {
      changeActiveClass(evt);
      const filteredData = getFilteredPhotos(evt.target.id, photos);
      const debouncedRenderGallery = debounce(renderThumbnails, RERENDER_DELAY);
      debouncedRenderGallery(filteredData);
    }
  });
};

export { sortPhoto };
