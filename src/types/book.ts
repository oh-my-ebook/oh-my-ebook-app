export interface BookPage {
  /** PDF 기준, 1부터 시작 */
  pageNumber: number;
  /** 페이지에 나타나는 순서 */
  lines: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  pages: BookPage[];
}
