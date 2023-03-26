import {renderThumbnails} from './thumbnails.js';
import { createPhotos } from './data.js';
import './form.js';

const photos = createPhotos();
renderThumbnails(photos);
