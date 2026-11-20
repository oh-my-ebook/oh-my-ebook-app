import type { FullscreenController } from '../shared/fullscreen';
import { BrowserFullscreen } from './fullscreen';

export const fullscreen: FullscreenController = new BrowserFullscreen();
