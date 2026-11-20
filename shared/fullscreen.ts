export interface FullscreenState {
  supported: boolean;
  active: boolean;
}

export interface FullscreenController {
  getState(): Promise<FullscreenState>;
  // 요청 처리 완료를 뜻한다. 실제 전환 상태는 subscribe로 확인한다.
  toggle(): Promise<void>;
  subscribe(listener: (state: FullscreenState) => void): () => void;
}
