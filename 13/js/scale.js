const START_VALUE = 100;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const scaleContainer = document.querySelector('.img-upload__scale');
const control = scaleContainer.querySelector('.scale__control--value');
const controlSmaller = scaleContainer.querySelector('.scale__control--smaller');
const controlBigger = scaleContainer.querySelector('.scale__control--bigger');
const photo = document.querySelector('.img-upload__preview img');

let startScaleValue = START_VALUE;

const resizePhoto = () => {
  control.value = `${startScaleValue}%`;
  photo.style.transform = `scale(${startScaleValue / 100})`;
};

controlSmaller.addEventListener('click', () => {
  if(startScaleValue !== MIN_SCALE) {
    startScaleValue -= STEP_SCALE;
  }
  resizePhoto(controlBigger);
});

controlBigger.addEventListener('click', () => {
  if(startScaleValue !== MAX_SCALE) {
    startScaleValue += STEP_SCALE;
  }
  resizePhoto(controlSmaller);
});

const removeScale = () => {
  startScaleValue = MAX_SCALE;
  photo.style.transform = `scale(${START_VALUE / 100})`;
  control.value = `${START_VALUE}%`;
};

export { removeScale };
