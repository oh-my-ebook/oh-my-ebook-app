import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { Slider } from '@/components/shadcn/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/tooltip';
import { usePageNavigation } from '../hooks/use-page-navigation';

function toPageNumber(value: number | readonly number[]) {
  return Array.isArray(value) ? value[0] : value;
}

interface PageNavigationButtonProps {
  icon: LucideIcon;
  label: string;
  disabled: boolean;
  onClick: () => void;
}

function PageNavigationButton({
  icon: Icon,
  label,
  disabled,
  onClick,
}: PageNavigationButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
            size="icon"
            variant="ghost"
          />
        }
      >
        <Icon data-icon="inline-start" />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function PageNavigator() {
  const {
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    goToPage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  } = usePageNavigation();

  // 슬라이더를 끄는 동안에는 페이지를 바꾸지 않고 위치 숫자만 미리 보여 준다.
  const [draggingPage, setDraggingPage] = useState<number | null>(null);
  const displayedPage = draggingPage ?? currentPage;

  // 한 페이지짜리 책은 min과 max가 같아 슬라이더가 그려지지 않으므로 0부터 시작해 손잡이를 끝에 둔다.
  const isSinglePageBook = totalPages === 1;

  return (
    <TooltipProvider>
      <nav
        aria-label="페이지 탐색"
        className="flex w-full min-w-0 items-center gap-1"
      >
        <PageNavigationButton
          icon={ChevronsLeftIcon}
          label="첫 페이지"
          disabled={!hasPreviousPage}
          onClick={goToFirstPage}
        />
        <PageNavigationButton
          icon={ChevronLeftIcon}
          label="이전 페이지"
          disabled={!hasPreviousPage}
          onClick={goToPreviousPage}
        />

        <output
          aria-label="페이지 위치"
          aria-live="polite"
          className="w-6 shrink-0 text-center tabular-nums text-xs text-muted-foreground"
        >
          {displayedPage}
          <span className="sr-only"> / {totalPages}</span>
        </output>
        <Slider
          className="min-w-0 flex-1 px-2 reader-slider"
          disabled={totalPages <= 1}
          min={isSinglePageBook ? 0 : 1}
          max={totalPages}
          step={1}
          value={[displayedPage]}
          onValueChange={(value) => setDraggingPage(toPageNumber(value))}
          onValueCommitted={(value) => {
            setDraggingPage(null);
            goToPage(toPageNumber(value));
          }}
        />
        <span
          aria-hidden="true"
          className="w-6 shrink-0 text-center tabular-nums text-xs text-muted-foreground"
        >
          {totalPages}
        </span>

        <PageNavigationButton
          icon={ChevronRightIcon}
          label="다음 페이지"
          disabled={!hasNextPage}
          onClick={goToNextPage}
        />
        <PageNavigationButton
          icon={ChevronsRightIcon}
          label="마지막 페이지"
          disabled={!hasNextPage}
          onClick={goToLastPage}
        />
      </nav>
    </TooltipProvider>
  );
}
