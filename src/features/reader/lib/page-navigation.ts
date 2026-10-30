// ponytail: 단일 페이지 기준 임시 계산, 두 쪽 보기·마지막 페이지(totalPages) 처리는 page-spread 붙일 때 추가
export function getAdjacentPages(currentPage: number) {
  return {
    previousPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage + 1,
  };
}
