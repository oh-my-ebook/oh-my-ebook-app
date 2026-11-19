import { useEffect, useState } from 'react';
import { fullscreen } from '@services';
import type { FullscreenState } from '../../../../shared/fullscreen';

export function useFullscreen() {
  const [state, setState] = useState<FullscreenState>({
    supported: false,
    active: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let disposed = false;
    let receivedChange = false;
    const unsubscribe = fullscreen.subscribe((next) => {
      receivedChange = true;
      if (!disposed) setState(next);
    });
    void fullscreen.getState().then(
      (initial) => {
        // 늦게 도착한 초기값으로 더 최근의 이벤트 상태를 덮어쓰지 않는다.
        if (!disposed && !receivedChange) setState(initial);
      },
      (cause: unknown) => {
        if (!disposed) setError(String(cause));
      },
    );
    return () => {
      disposed = true;
      unsubscribe();
    };
  }, []);

  const toggle = async () => {
    setError(null);
    setPending(true);
    try {
      await fullscreen.toggle();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    } finally {
      setPending(false);
    }
  };

  return { ...state, error, pending, toggle };
}
