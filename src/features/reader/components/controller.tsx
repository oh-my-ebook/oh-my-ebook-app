import { Separator } from '@/components/shadcn/separator';
import { PageNavigator } from './page-navigator';

function ReaderController() {
  return (
    <footer className="flex min-h-12 shrink-0 flex-wrap items-center gap-2 border-t bg-card px-4 py-2">
      <div className="min-w-64 flex-1">
        <PageNavigator />
      </div>
      <Separator
        className="h-5 data-vertical:w-[1.5px] data-vertical:self-center"
        orientation="vertical"
      />
      {/* PageNavigator처럼 배율 상태를 store에서 직접 읽는다. */}
      {/* <ZoomControls /> */}
    </footer>
  );
}

export default ReaderController;
