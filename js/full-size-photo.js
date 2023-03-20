const COMMENT_PORTION = 5;

const fullPictureContainer = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comments');
const commentCount = fullPictureContainer.querySelector('.social__comment-count');
const commentsLoader = fullPictureContainer.querySelector('.comments-loader');
const shownCommentsCount = commentCount.querySelector('.comments-shown');
const allCommentsCount = commentCount.querySelector('.comments-count');

let moduleComments = [];
let shownComments = 0;

const image = fullPictureContainer.querySelector('img');
const likesCount = fullPictureContainer.querySelector('.likes-count');

const fillComment = ({avatar, message, name}) => {
  const commentClone = commentTemplate.cloneNode(true);
  const commentImage = commentClone.querySelector('.social__picture');
  commentImage.src = avatar;
  commentImage.alt = name;

  const text = commentClone.querySelector('.social__text');
  text.textContent = message;

  return commentClone;
};

const renderComments = (comments) => {
  commentsList.innerHTML = '';
  commentsList.append(...comments.map(fillComment));
};


const renderFiveComments = () => {
  shownComments += COMMENT_PORTION;

  if (shownComments >= moduleComments.length) {
    shownComments = moduleComments.length;
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const comments = moduleComments.slice(0, shownComments);
  renderComments(comments);

  shownCommentsCount.textContent = shownComments;
  allCommentsCount.textContent = moduleComments.length;
};

const renderFullSizePhoto = ({url, likes, comments}) => {
  shownComments = 0;
  image.src = url;
  likesCount.textContent = likes;
  moduleComments = comments;
  renderFiveComments();
};

commentsLoader.addEventListener('click', renderFiveComments);

export { renderFullSizePhoto };
