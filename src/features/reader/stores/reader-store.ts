import { create } from 'zustand';

export type ViewMode = 'single' | 'spread';

// 목차, 하단 컨트롤러, PDF 뷰포트처럼 서로 떨어진 컴포넌트가 함께 읽고 바꾸는 값만 둔다.
// 목차·패널 열림처럼 Reader 안에서만 쓰는 화면 상태는 Reader의 useState로 관리한다.
interface ReaderState {
  currentPage: number;
  viewMode: ViewMode;
  actions: {
    setCurrentPage: (pageNumber: number) => void;
    setViewMode: (viewMode: ViewMode) => void;
  };
}

const useReaderStore = create<ReaderState>()((set) => ({
  currentPage: 1,
  viewMode: 'single',
  actions: {
    setCurrentPage: (pageNumber) => set({ currentPage: pageNumber }),
    setViewMode: (viewMode) => set({ viewMode }),
  },
}));

export const useCurrentPage = () =>
  useReaderStore((state) => state.currentPage);

export const useViewMode = () => useReaderStore((state) => state.viewMode);

export const useReaderActions = () => useReaderStore((state) => state.actions);
