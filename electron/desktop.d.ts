import type { FullscreenController } from '../shared/fullscreen';

declare global {
  interface Window {
    desktop?: { fullscreen: FullscreenController };
  }
}
