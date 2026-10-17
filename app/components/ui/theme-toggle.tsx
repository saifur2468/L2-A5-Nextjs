'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9" />
    );
  }

  const isDark = resolvedTheme === 'dark';

<button
  type="button"
  onClick={() => setTheme(isDark ? 'light' : 'dark')}
>
  {isDark ? <Sun /> : <Moon />}
</button>

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-xl
        border border-gray-200 bg-gray-100 text-gray-800
        transition-colors hover:bg-gray-200
        dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200
        dark:hover:bg-gray-700"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-amber-400" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
      )}
    </button>
  );
}