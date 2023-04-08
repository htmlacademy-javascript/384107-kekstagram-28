const Effects = {
  none: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: '',
  },
};

const defaultEffect = Effects.none;
let chosenEffect = Effects.none;
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const image = document.querySelector('.img-upload__preview img');
const effectButtonsList = document.querySelector('.effects__list');
const effectsValue = document.querySelector('.effect-level__value');

const showSlider = () => sliderContainer.classList.remove('hidden');
const hideSlider = () => sliderContainer.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.start,
  step: defaultEffect.step,
  connect: 'lower',
});

hideSlider();

const changeEffect = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.start,
    step: chosenEffect.step,
  });

  (chosenEffect === defaultEffect ? hideSlider : showSlider)();
};

effectButtonsList.addEventListener('click',(evt) => {
  if (evt.target.closest('.effects__radio')) {
    chosenEffect = Effects[evt.target.value];
    image.className = `effects__preview--${chosenEffect.name}`;
    changeEffect();
  }
});

const onSliderChange = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  if (chosenEffect === defaultEffect) {
    image.style.filter = 'none';
  } else {
    image.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }
  effectsValue.value = sliderValue;
};

sliderElement.noUiSlider.on('update', onSliderChange);

const removeEffects = () => {
  chosenEffect = defaultEffect;
  changeEffect();
};

export { removeEffects };
