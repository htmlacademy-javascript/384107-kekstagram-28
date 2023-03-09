import {createPhotos} from './data.js';

const picturesList = document.querySelector('.pictures');
const picture = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const createThumbnails = createPhotos();
const similarThumbnails = document.createDocumentFragment();

createThumbnails.forEach((element) => {
  const pictureClone = picture.cloneNode(true);
  const img = pictureClone.querySelector('.picture__img');
  img.src = element.url;
  const comment = pictureClone.querySelector('.picture__comments');
  comment.textContent = element.comments.length;
  const likes = pictureClone.querySelector('.picture__likes');
  likes.textContent = element.likes;
  similarThumbnails.append(pictureClone);
});

picturesList.append(similarThumbnails);
