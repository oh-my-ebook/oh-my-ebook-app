import { useEffect } from 'react';
import { useBookActions } from '@/stores/book-store';
import { useReaderActions } from '../stores/reader-store';

// 책을 열면 이전 책에서 보던 페이지가 남지 않도록 첫 페이지부터 보여 준다.
export function useOpenBook(bookId: string) {
  const { loadBook } = useBookActions();
  const { setCurrentPage } = useReaderActions();

  useEffect(() => {
    loadBook(bookId);
    setCurrentPage(1);
  }, [bookId, loadBook, setCurrentPage]);
}
