import type {
  FullscreenController,
  FullscreenState,
} from '../shared/fullscreen';

function readState(): FullscreenState {
  return {
    supported: Boolean(document.fullscreenEnabled),
    active: document.fullscreenElement !== null,
  };
}

export const fullscreen: FullscreenController = {
  async getState() {
    return readState();
  },
  async toggle() {
    if (document.fullscreenElement !== null) {
      await document.exitFullscreen();
    } else {
      if (!document.fullscreenEnabled) {
        throw new Error('이 환경에서는 전체 화면을 지원하지 않습니다.');
      }
      // 클릭의 사용자 활성화를 유지하도록 다른 비동기 작업보다 먼저 요청한다.
      await document.documentElement.requestFullscreen();
    }
  },
  subscribe(listener) {
    const handleChange = () => listener(readState());
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  },
};
