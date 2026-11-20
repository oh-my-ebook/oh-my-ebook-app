import { useEffect, useRef, type KeyboardEvent, type RefObject } from 'react';
import { XIcon } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/shadcn/sheet';
import { useIsWideScreen } from '../hooks/use-is-wide-screen';
import { usePageNavigation } from '../hooks/use-page-navigation';
// import { ScrollArea } from '@/components/shadcn/scroll-area'
// import { focusTocPageThumbnail } from '../lib/toc-focus'
// import { TocPageThumbnail } from './toc-page-thumbnail'

interface TocProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 썸네일 목록은 현재 페이지와 이동을 usePageNavigation에서 직접 가져온다.
// function TocThumbnailList() {
//   const { currentPage, goToPage } = usePageNavigation()
//   const { document, pages } = usePdfDocument()
//
//   if (!document) {
//     return null
//   }
//
//   return (
//     <ScrollArea className="min-h-0 flex-1">
//       <div className="flex flex-col gap-1 p-2">
//         {pages.map((page) => (
//           <TocPageThumbnail
//             document={document}
//             isCurrent={page.pageNumber === currentPage}
//             key={page.pageNumber}
//             onSelect={goToPage}
//             page={page}
//           />
//         ))}
//       </div>
//     </ScrollArea>
//   )
// }

function findCurrentPageThumbnail(container: HTMLElement | null) {
  return container?.querySelector<HTMLElement>('[aria-current="page"]') ?? null;
}

// 목차를 열 때 문서·페이지가 아직 준비되지 않아 썸네일이 없으면, 준비된 뒤 다시 시도한다.
// 스크롤은 TocPageThumbnail의 scrollIntoView가 전담하므로, 여기서는 preventScroll로
// 브라우저 기본 스크롤이 겹쳐 튀지 않게 한다.
function useFocusCurrentPageThumbnail(
  containerRef: RefObject<HTMLElement | null>,
  open: boolean,
) {
  const { currentPage } = usePageNavigation();

  useEffect(() => {
    if (open) {
      findCurrentPageThumbnail(containerRef.current)?.focus({
        preventScroll: true,
      });
    }
  }, [containerRef, open, currentPage]);
}

// 넓은 화면에서는 헤더 없이 툴바의 목차 버튼으로만 여닫는다. 열리면 바로 화살표 키로 페이지를
// 넘길 수 있도록, 포커스를 여는 버튼 대신 현재 페이지 썸네일로 옮긴다.
function WideToc({ open }: TocProps) {
  const asideRef = useRef<HTMLElement>(null);
  useFocusCurrentPageThumbnail(asideRef, open);

  if (!open) {
    return null;
  }

  return (
    <aside
      aria-label="목차"
      className="flex w-70 shrink-0 flex-col border-r bg-card"
      ref={asideRef}
      role="region"
    >
      {/* <TocThumbnailList /> */}
    </aside>
  );
}

// Sheet는 모달이라 열려 있는 동안 키보드 이벤트가 document까지 전달되지 않으므로,
// 위아래 화살표로 페이지를 넘기는 동작은 Sheet 안에서 직접 처리한다.
function NarrowToc({ open, onOpenChange }: TocProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { goToPreviousPage, goToNextPage } = usePageNavigation();

  // initialFocus는 Sheet가 열리는 시점에 한 번만 평가되므로, 그때 썸네일이 없었다면 준비된 뒤 다시 시도한다.
  useFocusCurrentPageThumbnail(contentRef, open);

  const handleKeyDown = (event: KeyboardEvent) => {
    const hasModifier =
      event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
    if (hasModifier) {
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      goToPreviousPage();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      goToNextPage();
    }
    // focusTocPageThumbnail(event.currentTarget, targetPage)
  };

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent
        aria-label="목차"
        initialFocus={() => findCurrentPageThumbnail(contentRef.current)}
        onKeyDown={handleKeyDown}
        ref={contentRef}
        showCloseButton={false}
        side="left"
      >
        <SheetHeader className="flex-row items-center justify-between">
          <SheetTitle>목차</SheetTitle>
          <SheetClose
            render={
              <Button aria-label="목차 닫기" size="icon-sm" variant="ghost" />
            }
          >
            <XIcon />
          </SheetClose>
        </SheetHeader>
        {/* <TocThumbnailList /> */}
      </SheetContent>
    </Sheet>
  );
}

export function Toc(props: TocProps) {
  const isWideScreen = useIsWideScreen();

  return isWideScreen ? <WideToc {...props} /> : <NarrowToc {...props} />;
}
