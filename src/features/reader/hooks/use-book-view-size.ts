import { useEffect, useRef, useState } from 'react';

interface BookViewSize {
  width: number;
  height: number;
}

export function useBookViewSize<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const [size, setSize] = useState<BookViewSize>({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return { containerRef, ...size };
}
