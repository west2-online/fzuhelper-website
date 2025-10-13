import { Moon, Sun } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useKV } from '@github/spark/hooks';
import { useEffect } from 'react';

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useKV<boolean>('dark-mode', false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((current) => !current);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/20"
    >
      {isDarkMode ? (
        <Sun size={16} className="text-foreground" />
      ) : (
        <Moon size={16} className="text-foreground" />
      )}
    </Button>
  );
}