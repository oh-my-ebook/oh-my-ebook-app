import {
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/shadcn/resizable';
import { useState } from 'react';

import ReaderController from './components/controller';
import { useReaderLayout } from './hooks/use-reader-layout';
import { Toolbar } from './components/toolbar';
import { Toc } from './components/toc';

function ReaderMain({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <main
      ref={containerRef}
      aria-label="PDF 읽기 영역"
      className="relative m-3 h-[calc(100%-1.5rem)] min-h-0 min-w-0 flex-1"
    >
      {/* <PdfViewport /> */}
    </main>
  );
}

// function ReaderPanel() {
//   return (
//     <ReaderPanel
//       isWideScreen={isWideScreen}
//       open={panelOpen}
//       onOpenChange={setPanelOpen}
//     >
//       <ReaderPanelContent />
//     </ReaderPanel>
//   );
// }

function Reader() {
  const { containerRef, isWideScreen } = useReaderLayout();
  const [isTocOpen, setTocOpen] = useState(false);
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex h-svh min-w-0 flex-col overflow-hidden">
      <Toolbar
        title="PDF Reader"
        isTocOpen={isTocOpen}
        isPanelOpen={isPanelOpen}
        onTogglePanel={() => setPanelOpen((open) => !open)}
        onToggleToc={() => setTocOpen((open) => !open)}
      />

      <div className="flex min-h-0 flex-1">
        <Toc
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isWideScreen={true}
          open={isTocOpen}
          onOpenChange={setTocOpen}
        />

        {/* <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel id="reader" defaultSize="70%" minSize="45%">
            <ReaderMain containerRef={containerRef} />
          </ResizablePanel>

          {isWideScreen && readerPanel}
        </ResizablePanelGroup> */}

        {/* {!isWideScreen && readerPanel} */}
      </div>

      <ReaderController />
    </div>
  );
}

export default Reader;
