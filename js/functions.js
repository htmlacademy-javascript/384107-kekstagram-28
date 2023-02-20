// Функция 1
const isValidLength = (string, validLength) => string.length <= validLength;

isValidLength('проверяемая строка', 20);

// Функция 2
const isPalindrome = (string) => {
  const newString = string.toLowerCase().replaceAll(' ', '');

  for(let i = 0; i < string.length - 1; i ++) {
    if (newString[i] !== newString[newString.length - i - 1]) {
      return false;
    }
  }
  return true;
};

isPalindrome('Лёша на полке клопа нашёл ');

//Функция 3, вариант 1

const extractNumbersFromString = (string) => {

  if (typeof(string) === 'number') {
    return string;
  }
  const matches = string.match(/\d+/g);
  let allNumbersString = '';
  if (matches) {
    matches.forEach((el) => {
      allNumbersString += el;
    });
  }

  return allNumbersString ? Number(allNumbersString) : NaN;
};

extractNumbersFromString('1 кефир, 0.5 батона');

// Функция 3, вариант 2
const getPositiveInteger = (string) => {
  if (typeof(string) === 'number') {
    return string;
  }
  let newString = '';
  const stringWithoutSpaces = string.replaceAll(' ', '');

  for (let i = 0; i < string.length; i++) {
    const changingElement = Number(stringWithoutSpaces[i]);

    if(!isNaN(changingElement.valueOf())) {
      newString = newString.concat(changingElement);
    }
  }
  return newString === '' ? NaN : Number(newString);
};

getPositiveInteger('1 кефир, 0.5 батона');

//Функция 4
const changeStringLength = (string, minLength, additionSymbols) => {
  if (string.length >= minLength) {
    return string;
  }

  const differenceBetweenTwoLengths = minLength - string.length;
  let additionString = '';

  if (differenceBetweenTwoLengths / additionSymbols.length === 1) {
    additionString = additionSymbols;
  }

  if (differenceBetweenTwoLengths % additionSymbols.length === 0) {
    additionString = additionSymbols.repeat(differenceBetweenTwoLengths / additionSymbols.length);
  }

  const fullMatchNumber = Math.floor(differenceBetweenTwoLengths / additionSymbols.length);
  const firstPartOfAdditionString = additionSymbols.repeat(fullMatchNumber);
  const secondPartOfAdditionString = additionSymbols.slice(0, differenceBetweenTwoLengths % additionSymbols.length);

  additionString = secondPartOfAdditionString + firstPartOfAdditionString;

  return additionString + string;
};
changeStringLength('1', 2, '0');
