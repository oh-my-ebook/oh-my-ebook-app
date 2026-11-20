import type { Book } from '@/types/book';

export const SAMPLE_BOOK_ID = 'reading-notes';

// 쪽수는 pages.length, 줄 번호는 lines의 배열 인덱스로 구한다.
export const mockBooks: Book[] = [
  {
    id: SAMPLE_BOOK_ID,
    title: '독서 노트 쓰는 법',
    author: '김서연',
    pages: [
      {
        pageNumber: 1,
        lines: [
          '기록할 문장 고르기',
          '책을 읽다가 생각이 멈춘 문장에 밑줄을 긋는다.',
          '장을 다 읽은 뒤 밑줄 친 문장 중 하나를 고른다.',
        ],
      },
      {
        pageNumber: 2,
        lines: [
          '질문으로 남기기',
          '고른 문장 아래에 왜 그 문장이 마음에 남았는지 한 줄로 적는다.',
          '바로 답하기 어려운 생각은 질문으로 남겨 둔다.',
        ],
      },
      {
        pageNumber: 3,
        lines: [
          '다시 읽기',
          '일주일 뒤 노트를 펼쳐 남겨 둔 질문을 다시 읽는다.',
          '답이 생긴 질문에는 그 답을 덧붙여 적는다.',
        ],
      },
    ],
  },
];
