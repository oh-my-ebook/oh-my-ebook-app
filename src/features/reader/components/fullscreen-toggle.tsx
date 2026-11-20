import { MaximizeIcon, MinimizeIcon } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { useFullscreen } from '../hooks/use-fullscreen';

export function FullscreenToggle() {
  const { supported, active, pending, error, toggle } = useFullscreen();

  return (
    <>
      {supported && (
        <Button
          aria-label={active ? '전체 화면 종료' : '전체 화면'}
          aria-pressed={active}
          disabled={pending}
          onClick={toggle}
          size="icon-sm"
          variant="ghost"
        >
          {active ? <MinimizeIcon /> : <MaximizeIcon />}
        </Button>
      )}
      {error && <span role="alert">{error}</span>}
    </>
  );
}
