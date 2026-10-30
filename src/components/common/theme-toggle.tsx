import { MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/shadcn/button';
import { createContext } from '@/context/create-context';

export type ThemeMode = 'light' | 'dark';

interface ThemeContext {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const [ThemeContextProvider, useTheme] = createContext<ThemeContext>({
  contextName: 'ThemeContext',
  hookName: 'useTheme',
  providerName: 'ThemeContextProvider',
});

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

function ThemeProvider({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : defaultTheme;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContextProvider value={{ theme, setTheme }}>
      {children}
    </ThemeContextProvider>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? '라이트 모드로 전환' : '다크 모드로 전환';

  return (
    <Button
      aria-label={label}
      title={label}
      size="icon-sm"
      variant="ghost"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}

export { ThemeProvider, ThemeToggle, useTheme };
