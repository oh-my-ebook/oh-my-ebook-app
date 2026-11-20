import { SAMPLE_BOOK_ID } from '@/mocks/books';
import Reader from '@/features/reader';

// 라우트에 책 id가 생기기 전까지는 샘플 책을 연다.
function ReaderPage() {
  return <Reader bookId={SAMPLE_BOOK_ID} />;
}

export default ReaderPage;
