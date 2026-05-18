import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'site-theme';

function getPreferredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === 'dark' || stored === 'light') return stored;
  } catch (e) {
    // ignore
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
}

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());

  const apply = useCallback((t: Theme) => {
    const el = document.documentElement;
    if (!el) return;
    if (t === 'dark') {
      el.classList.add('theme-dark');
      el.classList.remove('theme-light');
    } else {
      el.classList.remove('theme-dark');
      el.classList.add('theme-light');
    }
  }, []);

  useEffect(() => {
    apply(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme, apply]);

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (!mq) return;
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
    try {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } catch (e) {
      // Safari fallback
      // @ts-ignore
      mq.addListener && mq.addListener(handler);
      return () => mq.removeListener && mq.removeListener(handler);
    }
  }, []);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  return { theme, setTheme, toggleTheme } as const;
}
