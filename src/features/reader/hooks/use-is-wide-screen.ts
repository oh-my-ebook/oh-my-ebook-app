import { useMediaQuery } from '@/hooks/use-media-query';

// 패널을 여닫을 때 레이아웃이 바뀌지 않도록 읽기 영역이 아닌 브라우저 창 너비로만 판단한다.
// 두 페이지 보기 가능 여부도 이 값을 그대로 쓴다.
export function useIsWideScreen() {
  return useMediaQuery('(min-width: 1024px)');
}
