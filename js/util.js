const isEscapeKey = (evt) => evt.key === 'Escape';

const sortRandomly = () => Math.random() - 0.5;

const stopEventPropagation = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

export {
  isEscapeKey,
  stopEventPropagation,
  sortRandomly
};
