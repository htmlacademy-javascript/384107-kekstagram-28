const ARRAY_LENGTH = 25;

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

const values = {
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

const getUniqPhotoId = getUniqNumberFromRange(values.photoId.min, values.photoId.max);
const getUniqUrl = getUniqNumberFromRange(values.url.min, values.url.max);

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

//Создаёт комментарий
const createComment = () => ({
  id: uniqValue(),
  avatar: `img/avatar-${getRandomInteger(values.avatar.min, values.avatar.max)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(USERS_NAMES)
});

const createComments = () => {
  const commentsArray = Array.from({length: getRandomInteger(values.comment.min, values.comment.max)}, createComment);
  return commentsArray;
};

const createMockPhotos = () => ({
  id: getUniqPhotoId(),
  url: `url/${getUniqUrl()}.jpg`,
  description: getRandomElement(DESCRIPTIONS),
  likes: getRandomInteger(values.likes.min, values.likes.max),
  comments: createComments()
});

const createPhotos = () => Array.from({length: ARRAY_LENGTH}, createMockPhotos);
createPhotos();
