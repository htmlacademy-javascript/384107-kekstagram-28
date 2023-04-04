import './form.js';
import './scale.js';
import './slider.js';
import { showErrorText} from './message.js';
import {getData} from './api.js';
import {renderThumbnails} from './thumbnails.js';

getData(renderThumbnails, showErrorText);

getData()
  .then((data) => {
    renderThumbnails(data);
  })
  .catch(
    () => {
      showErrorText();
    }
  );
