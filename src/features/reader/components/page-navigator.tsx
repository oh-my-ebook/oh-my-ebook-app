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

function getPageNumber(value: number | readonly number[]) {
  return Array.isArray(value) ? value[0] : value;
}

interface PageNavigationButtonProps {
  disabled: boolean;
  icon: LucideIcon;
  label: string;
  onPageChange: () => void;
}

function PageNavigationButton({
  disabled,
  icon: Icon,
  label,
  onPageChange,
}: PageNavigationButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={label}
            disabled={disabled}
            onClick={onPageChange}
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

interface PageNavigatorProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
  totalPages: number;
}

export function PageNavigator({
  currentPage,
  setCurrentPage,
  disabled = false,
  totalPages,
}: PageNavigatorProps) {
  const [previewPage, setPreviewPage] = useState<number | null>(null);
  const sliderPage = previewPage ?? currentPage;
  // const navigation = getPageNavigation(totalPages, previousPage, nextPage);

  return (
    <TooltipProvider>
      <nav
        aria-label="페이지 탐색"
        className="flex w-full min-w-0 items-center gap-1"
      >
        <PageNavigationButton
          disabled={disabled}
          icon={ChevronsLeftIcon}
          label="첫 페이지"
          onPageChange={() => setCurrentPage(1)}
        />
        <PageNavigationButton
          disabled={disabled}
          icon={ChevronLeftIcon}
          label="이전 페이지"
          onPageChange={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        />

        <output
          aria-label="페이지 위치"
          aria-live="polite"
          className="w-6 shrink-0 text-center tabular-nums text-xs text-muted-foreground"
        >
          {sliderPage}
          <span className="sr-only"> / {totalPages}</span>
        </output>
        <Slider
          className="min-w-0 flex-1 px-2 reader-slider"
          disabled={disabled || totalPages === 1}
          max={totalPages}
          min={totalPages === 1 ? 0 : 1}
          onValueChange={(pageNumbers) => {
            const pageNumber = getPageNumber(pageNumbers);
            if (typeof pageNumber === 'number') {
              setPreviewPage(pageNumber);
            }
          }}
          onValueCommitted={(pageNumbers) => {
            setPreviewPage(null);
            const pageNumber = getPageNumber(pageNumbers);
            if (
              typeof pageNumber !== 'number' ||
              !Number.isSafeInteger(pageNumber) ||
              pageNumber < 1 ||
              pageNumber > totalPages
            ) {
              return;
            }

            setCurrentPage(pageNumber);
          }}
          step={1}
          value={[sliderPage]}
        />
        <span
          aria-hidden="true"
          className="w-6 shrink-0 text-center tabular-nums text-xs text-muted-foreground"
        >
          {totalPages}
        </span>

        <PageNavigationButton
          disabled={disabled}
          icon={ChevronRightIcon}
          label="다음 페이지"
          onPageChange={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        />
        <PageNavigationButton
          disabled={disabled}
          icon={ChevronsRightIcon}
          label="마지막 페이지"
          onPageChange={() => setCurrentPage(totalPages)}
        />
      </nav>
    </TooltipProvider>
  );
}
