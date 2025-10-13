import { Moon, Sun, CircleHalf, Check } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

function useThemeStorage(key: string, defaultValue: Theme) {
  const [value, setValue] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = (newValue: Theme) => {
    setValue(newValue);
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch {
      // Handle storage errors gracefully
    }
  };

  return [value, setStoredValue] as const;
}

export function ThemeToggle() {
  const [theme, setTheme] = useThemeStorage('theme', 'system');
  const [systemIsDark, setSystemIsDark] = useState(false);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };
    
    setSystemIsDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      root.classList.remove('light', 'dark');
      // Let CSS @media queries handle system theme
    } else if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  const getIcon = () => {
    if (theme === 'system') {
      return <CircleHalf size={16} className="text-foreground" />;
    } else if (theme === 'dark') {
      return <Moon size={16} className="text-foreground" />;
    } else {
      return <Sun size={16} className="text-foreground" />;
    }
  };

  const getTooltip = () => {
    if (theme === 'system') return '跟随系统';
    if (theme === 'dark') return '深色模式';
    return '浅色模式';
  };

  const themeOptions = [
    { value: 'system', label: '跟随系统', icon: CircleHalf },
    { value: 'light', label: '浅色模式', icon: Sun },
    { value: 'dark', label: '深色模式', icon: Moon },
  ] as const;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          title={getTooltip()}
          className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/20"
        >
          {getIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {themeOptions.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Icon size={16} className="text-muted-foreground" />
              <span>{label}</span>
            </div>
            {theme === value && (
              <Check size={16} className="text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}