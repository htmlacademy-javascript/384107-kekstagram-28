import { createPhotos } from './data.js';

const picturesList = document.querySelector('.pictures');
const picture = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const photos = createPhotos();


const createElement = ({url, comments, likes}) => {
  const pictureClone = picture.cloneNode(true);
  pictureClone.querySelector('.picture__img').src = url;
  pictureClone.querySelector('.picture__comments').textContent = comments.length;
  pictureClone.querySelector('.picture__likes').textContent = likes;
  return pictureClone;
};

const renderThumbnails = () => {
  const similarThumbnails = document.createDocumentFragment();
  photos.forEach((element) => {
    const thumbnail = createElement(element);
    similarThumbnails.append(thumbnail);
  });

  picturesList.append(similarThumbnails);
};

export {renderThumbnails};
