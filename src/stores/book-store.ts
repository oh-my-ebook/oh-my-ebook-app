import { create } from 'zustand';
import { mockBooks } from '@/mocks/books';
import type { Book } from '@/types/book';

interface BookState {
  currentBook: Book | null;
  actions: {
    loadBook: (bookId: string) => void;
  };
}

// store 자체는 내보내지 않고, 화면에서 필요한 값만 hook으로 꺼내 쓴다.
const useBookStore = create<BookState>()((set) => ({
  currentBook: null,
  actions: {
    loadBook: (bookId) => {
      const book = mockBooks.find(({ id }) => id === bookId) ?? null;
      set({ currentBook: book });
    },
  },
}));

export const useCurrentBook = () => useBookStore((state) => state.currentBook);

export const useBookActions = () => useBookStore((state) => state.actions);
