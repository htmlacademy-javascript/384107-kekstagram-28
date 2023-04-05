import './form.js';
import './scale.js';
import './slider.js';
import { showErrorText} from './message.js';
import {getData} from './api.js';
import {renderThumbnails} from './thumbnails.js';


getData()
  .then((data) => {
    renderThumbnails(data);
  })
  .catch(
    () => {
      showErrorText();
    }
  );
