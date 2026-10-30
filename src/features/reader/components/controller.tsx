import { Separator } from '@/components/shadcn/separator';
import { PageNavigator } from './page-navigator';
import { useState } from 'react';

function ReaderController() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <footer className="flex min-h-12 shrink-0 flex-wrap items-center gap-2 border-t bg-card px-4 py-2">
      <div className="min-w-64 flex-1">
        <PageNavigator
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={5}
        />
      </div>
      <Separator
        className="h-5 data-vertical:w-[1.5px] data-vertical:self-center"
        orientation="vertical"
      />
      {/* <ZoomControls
            isFitHeight={zoom.mode === 'fit-height'}
            scale={displayScale}
            canZoomIn={canIncreaseZoom(displayScale)}
            canZoomOut={canDecreaseZoom(displayScale)}
            disabled={!isPageReady}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onFitHeight={() => setZoom(FIT_HEIGHT_ZOOM)}
          /> */}
    </footer>
  );
}

export default ReaderController;
