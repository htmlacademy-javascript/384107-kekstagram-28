const ARRAY_LENGTH = 25;

const VALUES = {
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

const getUniqPhotoId = getUniqNumberFromRange(VALUES.photoId.min, VALUES.photoId.max);
const getUniqUrl = getUniqNumberFromRange(VALUES.url.min, VALUES.url.max);

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


const createMockData = () => {
  //Находит количество комментов — один или два
  const getCommentCount = () => {
    const commentCount = getRandomInteger(VALUES.comment.min, VALUES.comment.max);
    const comment = getRandomElement(MESSAGES);
    return commentCount === VALUES.comment.max
      ? comment.concat(' ', getRandomElement(MESSAGES))
      : comment;
  };

  const url = 'photos/';
  const avatarUrl = '';

  return {
    id: getUniqPhotoId(),
    url: url.concat(getUniqUrl(), '.jpg'),
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(VALUES.likes.min, VALUES.likes.max),
    comments:
      {
        id: uniqValue(),
        avatar: avatarUrl.concat('img/avatar-', getRandomInteger(VALUES.avatar.min, VALUES.avatar.max), '.svg'),
        message: getCommentCount(),
        name: getRandomElement(USERS_NAMES)
      }
  };
};

Array.from({length: ARRAY_LENGTH}, createMockData);
