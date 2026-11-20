import {
  ArrowLeftIcon,
  BookmarkIcon,
  ListIcon,
  PanelRightIcon,
  type LucideIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Button } from '@/components/shadcn/button';
import { Separator } from '@/components/shadcn/separator';
import { useCurrentBook } from '@/stores/book-store';
import { FullscreenToggle } from './fullscreen-toggle';
import { ViewModeToggle } from './view-mode-toggle';

interface PanelToggleButtonProps {
  icon: LucideIcon;
  label: { open: string; close: string };
  isOpen: boolean;
  onToggle: () => void;
}

function PanelToggleButton({
  icon: Icon,
  label,
  isOpen,
  onToggle,
}: PanelToggleButtonProps) {
  return (
    <Button
      aria-label={isOpen ? label.close : label.open}
      aria-pressed={isOpen}
      onClick={onToggle}
      size="icon-sm"
      variant={isOpen ? 'secondary' : 'ghost'}
    >
      <Icon />
    </Button>
  );
}

function ToolbarSeparator() {
  return (
    <Separator
      className="h-5 data-vertical:w-[1.5px] data-vertical:self-center"
      orientation="vertical"
    />
  );
}

interface ToolbarProps {
  isTocOpen: boolean;
  onToggleToc: () => void;
  isPanelOpen: boolean;
  onTogglePanel: () => void;
}

export function Toolbar({
  isTocOpen,
  onToggleToc,
  isPanelOpen,
  onTogglePanel,
}: ToolbarProps) {
  const navigate = useNavigate();
  const book = useCurrentBook();

  return (
    <header
      aria-label="독서 도구"
      className="grid min-h-12 min-w-0 shrink-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-b bg-card px-3 py-2 max-sm:grid-cols-[1fr_auto]"
    >
      <div className="flex items-center gap-1">
        <Button
          aria-label="책장으로 돌아가기"
          onClick={() => navigate('/library')}
          size="icon-sm"
          variant="ghost"
        >
          <ArrowLeftIcon />
        </Button>
        <ToolbarSeparator />
        <PanelToggleButton
          icon={ListIcon}
          label={{ open: '목차 열기', close: '목차 닫기' }}
          isOpen={isTocOpen}
          onToggle={onToggleToc}
        />
        <Button aria-label="책갈피" size="icon-sm" variant="ghost">
          <BookmarkIcon />
        </Button>
      </div>

      <h1 className="min-w-0 truncate text-center font-medium max-sm:col-span-2 max-sm:row-start-2">
        {book?.title}
      </h1>

      <div className="flex items-center justify-end gap-1">
        <ViewModeToggle />
        <FullscreenToggle />
        <ToolbarSeparator />
        <ThemeToggle />
        <PanelToggleButton
          icon={PanelRightIcon}
          label={{ open: '함께 읽기 패널 열기', close: '함께 읽기 패널 닫기' }}
          isOpen={isPanelOpen}
          onToggle={onTogglePanel}
        />
      </div>
    </header>
  );
}
