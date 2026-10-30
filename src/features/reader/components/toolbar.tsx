import type { RefObject } from 'react';
import {
  ArrowLeftIcon,
  BookmarkIcon,
  ListIcon,
  PanelRightIcon,
} from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { Separator } from '@/components/shadcn/separator';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { FullscreenToggle } from './fullscreen-toggle';
import { useNavigate } from 'react-router';
import { ViewModeToggle } from './view-mode-toggle';

// interface ReaderToolbarProps {
//   onToggleToc: () => void;
//   tocButtonRef: RefObject<HTMLButtonElement | null>;
//   tocOpen: boolean;
//   onTogglePanel: () => void;
//   panelButtonRef: RefObject<HTMLButtonElement | null>;
//   panelOpen: boolean;
//   title: string;
//   preferredView: PageViewMode;
//   isSpreadAvailable: boolean;
//   onViewChange: (view: PageViewMode) => void;
// }

interface ToolbarProps {
  title: string;
  onToggleToc: () => void;
  isTocOpen: boolean;
  onTogglePanel: () => void;
  isPanelOpen: boolean;
}

export function Toolbar({
  onToggleToc,
  isTocOpen,
  onTogglePanel,
  isPanelOpen,
}: ToolbarProps) {
  const navigation = useNavigate();

  return (
    <header
      aria-label="독서 도구"
      className="grid min-h-12 min-w-0 shrink-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-b bg-card px-3 py-2 max-sm:grid-cols-[1fr_auto]"
    >
      <div className="flex items-center gap-1">
        <Button
          aria-label="책장으로 돌아가기"
          onClick={() => navigation('/library')}
          size="icon-sm"
          variant="ghost"
        >
          <ArrowLeftIcon />
        </Button>
        <Separator
          className="h-5 data-vertical:w-[1.5px] data-vertical:self-center"
          orientation="vertical"
        />
        <Button
          aria-label={isTocOpen ? '목차 닫기' : '목차 열기'}
          aria-pressed={isTocOpen}
          onClick={onToggleToc}
          size="icon-sm"
          variant={isTocOpen ? 'secondary' : 'ghost'}
        >
          <ListIcon />
        </Button>
        <Button aria-label="책갈피" size="icon-sm" variant="ghost">
          <BookmarkIcon />
        </Button>
      </div>

      <h1 className="min-w-0 truncate text-center font-medium max-sm:col-span-2 max-sm:row-start-2">
        {'제목'}
      </h1>

      <div className="flex items-center justify-end gap-1">
        <ViewModeToggle
        // isSpreadAvailable={isSpreadAvailable}
        // onViewChange={onViewChange}
        // preferredView={preferredView}
        />
        <FullscreenToggle />
        <Separator
          className="h-5 data-vertical:w-[1.5px] data-vertical:self-center"
          orientation="vertical"
        />
        <ThemeToggle />
        <Button
          aria-label={
            isPanelOpen ? '함께 읽기 패널 닫기' : '함께 읽기 패널 열기'
          }
          aria-pressed={isPanelOpen}
          onClick={onTogglePanel}
          size="icon-sm"
          variant={isPanelOpen ? 'secondary' : 'ghost'}
        >
          <PanelRightIcon />
        </Button>
      </div>
    </header>
  );
}
