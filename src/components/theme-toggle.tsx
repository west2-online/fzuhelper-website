import { Moon, Sun, CircleHalf } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useKV } from '@github/spark/hooks';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const [theme, setTheme] = useKV<Theme>('theme', 'system');
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

  const cycleTheme = () => {
    setTheme((current) => {
      if (current === 'system') return 'light';
      if (current === 'light') return 'dark';
      return 'system';
    });
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <CircleHalf size={16} className="text-foreground" />;
    } else if (theme === 'dark') {
      return <Sun size={16} className="text-foreground" />;
    } else {
      return <Moon size={16} className="text-foreground" />;
    }
  };

  const getTooltip = () => {
    if (theme === 'system') return '跟随系统';
    if (theme === 'dark') return '深色模式';
    return '浅色模式';
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={cycleTheme}
      title={getTooltip()}
      className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/20"
    >
      {getIcon()}
    </Button>
  );
}