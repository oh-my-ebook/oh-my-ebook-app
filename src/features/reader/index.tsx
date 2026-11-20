import {
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/shadcn/resizable';
import { useState } from 'react';
import { useToggle } from '@/hooks/use-toggle';

import ReaderController from './components/controller';
import { Toc } from './components/toc';
import { Toolbar } from './components/toolbar';
import { useBookViewSize } from './hooks/use-book-view-size';
import { useIsWideScreen } from './hooks/use-is-wide-screen';

function ReaderMain() {
  const { containerRef } = useBookViewSize<HTMLElement>();

  return (
    <main
      ref={containerRef}
      aria-label="PDF 읽기 영역"
      className="relative m-3 h-[calc(100%-1.5rem)] min-h-0 min-w-0 flex-1"
    >
      {/* <PdfViewport width={width} height={height} /> */}
    </main>
  );
}

function Reader() {
  const isWideScreen = useIsWideScreen();
  const [currentPage, setCurrentPage] = useState(1);

  const [isTocOpen, toggleToc, setTocOpen] = useToggle();
  const [isPanelOpen, togglePanel] = useToggle();

  // 넓은 화면에서는 패널을 읽기 영역 옆에 붙이고, 좁은 화면에서는 Sheet로 띄운다.
  // const readerPanel = <ReaderPanel open={isPanelOpen} onOpenChange={setPanelOpen} />;

  return (
    <div className="flex h-svh min-w-0 flex-col overflow-hidden">
      <Toolbar
        title="PDF Reader"
        isTocOpen={isTocOpen}
        onToggleToc={toggleToc}
        isPanelOpen={isPanelOpen}
        onTogglePanel={togglePanel}
      />

      <div className="flex min-h-0 flex-1">
        <Toc
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isWideScreen={isWideScreen}
          open={isTocOpen}
          onOpenChange={setTocOpen}
        />

        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel id="reader" defaultSize="70%" minSize="45%">
            <ReaderMain />
          </ResizablePanel>

          {/* {isWideScreen && readerPanel} */}
        </ResizablePanelGroup>

        {/* {!isWideScreen && readerPanel} */}
      </div>

      <ReaderController />
    </div>
  );
}

export default Reader;
