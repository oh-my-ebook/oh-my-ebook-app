import { useCurrentBook } from '@/stores/book-store';
import { useCurrentPage, useReaderActions } from '../stores/reader-store';

// 페이지 범위 계산은 여기서만 하고, 컴포넌트는 "어디로 이동할지"만 말한다.
export function usePageNavigation() {
  const currentPage = useCurrentPage();
  const totalPages = useCurrentBook()?.pages.length ?? 0;
  const { setCurrentPage } = useReaderActions();

  const goToPage = (pageNumber: number) => {
    if (totalPages === 0) {
      return;
    }

    setCurrentPage(Math.min(Math.max(pageNumber, 1), totalPages));
  };

  return {
    currentPage,
    totalPages,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
    goToPage,
    goToFirstPage: () => goToPage(1),
    goToPreviousPage: () => goToPage(currentPage - 1),
    goToNextPage: () => goToPage(currentPage + 1),
    goToLastPage: () => goToPage(totalPages),
  };
}
