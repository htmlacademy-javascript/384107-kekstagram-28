import {renderThumbnails} from './thumbnails.js';
import { createPhotos } from './data.js';
import './form.js';
import './scale.js';
import './slider.js';

const photos = createPhotos();
renderThumbnails(photos);
