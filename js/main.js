const ARRAY_LENGTH = 25;

const VALUE = {
  photoId: {
    min: 1,
    max: 25
  },
  url: {
    min: 1,
    max: 25
  },
  likes: {
    min: 15,
    max: 200
  },
  avatar: {
    min: 1,
    max: 6
  },
  comment: {
    min: 1,
    max: 2
  }
};

const DESCRIPTIONS = [
  'Тысячное фото моего любимого котика',
  'Зажигаем!',
  'А вы тоже счётчики фотографируете?',
  'О дивный новый мир!',
  'В пути!',
  'Скучали?'
];

const USERS_NAMES = [
  'Элиас Канетти',
  'Самюэль Хантингтон',
  'Патрик Бьюкенен',
  'Арнольд Тойнби',
  'Джаред Даймонд'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

//Возвращает случайное целое число
const getRandomInteger = (firstValue, secondValue) => {
  const min = Math.ceil(Math.min(Math.abs(firstValue), Math.abs(secondValue)));
  const max = Math.floor(Math.max(Math.abs(firstValue), Math.abs(secondValue)));
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//Возвращает случайное уникальное число из диапазона чисел
const getUniqNumberFromRange = (min, max) => {
  const previousValues = [];
  return function() {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    while(previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getUniqPhotoId = getUniqNumberFromRange(VALUE.photoId.min, VALUE.photoId.max);
const getUniqUrl = getUniqNumberFromRange(VALUE.url.min, VALUE.url.max);

//Генерирует неповторяющееся число от единицы и до бесконечности
const createNumberGenerator = () => {
  let firstGeneratedNumber = 0;

  return function() {
    firstGeneratedNumber += 1;
    return firstGeneratedNumber;
  };
};

const uniqValue = createNumberGenerator();

//Возвращает случайный элемент из массива
const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Находит количество комментов — один или два
const getCommentMessage = () => {
  const commentCount = getRandomInteger(VALUE.comment.min, VALUE.comment.max);
  const comment = getRandomElement(MESSAGES);
  return commentCount === VALUE.comment.max
    ? comment.concat(' ', getRandomElement(MESSAGES))
    : comment;
};

const createMockData = () => {
  const url = 'photos/';
  const avatarUrl = '';

  return {
    id: getUniqPhotoId(),
    url: url.concat(getUniqUrl(), '.jpg'),
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(VALUE.likes.min, VALUE.likes.max),
    comments:
      {
        id: uniqValue(),
        avatar: avatarUrl.concat('img/avatar-', getRandomInteger(VALUE.avatar.min, VALUE.avatar.max), '.svg'),
        message: getCommentMessage(),
        name: getRandomElement(USERS_NAMES)
      }
  };
};

Array.from({length: ARRAY_LENGTH}, createMockData);
