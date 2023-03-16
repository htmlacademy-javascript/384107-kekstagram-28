const fullPictureContainer = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comments');

const fillComment = ({avatar, message, name}) => {
  const commentClone = commentTemplate.cloneNode(true);
  const commentImage = commentClone.querySelector('.social__picture');
  commentImage.src = avatar;
  commentImage.alt = name;

  const text = commentClone.querySelector('.social__text');
  text.textContent = message;

  return commentClone;
};

const renderComments = (elements, list) => {
  elements.forEach((element) => {
    const comment = fillComment(element);
    list.append(comment);
  });
};

const renderFullSizePhoto = ({url, likes, comments}) => {
  const image = fullPictureContainer.querySelector('img');
  image.src = url;

  const likesCount = fullPictureContainer.querySelector('.likes-count');
  likesCount.textContent = likes;

  commentsList.innerHTML = '';
  renderComments(comments, commentsList);

};

export { renderFullSizePhoto };
