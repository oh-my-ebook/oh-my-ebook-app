import type { FullscreenController } from '../shared/fullscreen';

if (!window.desktop) {
  throw new Error('Electron preload API가 없습니다.');
}

export const fullscreen: FullscreenController = window.desktop.fullscreen;
