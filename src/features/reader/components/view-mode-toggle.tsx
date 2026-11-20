import { BookOpenIcon, FileIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from '@/components/shadcn/toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/tooltip';
import { useIsWideScreen } from '../hooks/use-is-wide-screen';
import {
  useReaderActions,
  useViewMode,
  type ViewMode,
} from '../stores/reader-store';

const VIEW_MODE_OPTIONS = [
  { value: 'single', label: '한 페이지', icon: FileIcon },
  { value: 'spread', label: '두 페이지', icon: BookOpenIcon },
] as const;

function isViewMode(value: unknown): value is ViewMode {
  return value === 'single' || value === 'spread';
}

export function ViewModeToggle() {
  const viewMode = useViewMode();
  const { setViewMode } = useReaderActions();
  const isSpreadAvailable = useIsWideScreen();

  useEffect(() => {
    if (viewMode === 'spread' && !isSpreadAvailable) {
      toast.add({ title: '화면이 좁아 한 페이지로 표시합니다.' });
    }
  }, [isSpreadAvailable, viewMode]);

  // 공간 부족 toast는 위 effect가 계속 담당해야 하므로 컴포넌트는 마운트한 채 조작만 숨긴다.
  if (!isSpreadAvailable) {
    return null;
  }

  const handleValueChange = (values: unknown[]) => {
    const [nextViewMode] = values;
    if (isViewMode(nextViewMode)) {
      setViewMode(nextViewMode);
    }
  };

  return (
    <ToggleGroup
      aria-label="보기 방식"
      className="bg-muted p-0.5"
      onValueChange={handleValueChange}
      size="sm"
      spacing={0.5}
      value={[viewMode]}
    >
      {VIEW_MODE_OPTIONS.map(({ value, label, icon: Icon }) => (
        <Tooltip key={value}>
          <TooltipTrigger
            render={
              // 트랙(radius-md, 패딩 2px) 안의 항목이라 모서리를 한 단계 줄이고, 선택 항목은 shadcn Tabs처럼 트랙 위에 떠 보이게 한다.
              <ToggleGroupItem
                aria-label={label}
                className="h-7 w-8 min-w-0 rounded-sm border border-transparent px-0 hover:bg-transparent data-pressed:bg-card data-pressed:shadow-sm dark:data-pressed:border-input dark:data-pressed:bg-input/30 [&_svg:not([class*='size-'])]:size-4"
                value={value}
              />
            }
          >
            <Icon />
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </ToggleGroup>
  );
}
