import './form.js';
import './scale.js';
import './slider.js';
import { sortPhoto } from './filter.js';
import { showErrorText } from './message.js';
import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';

getData()
  .then((data) => {
    renderThumbnails(data);
    sortPhoto(data);
  })
  .catch(
    () => {
      showErrorText();
    }
  );
