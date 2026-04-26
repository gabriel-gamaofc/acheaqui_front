import { useEffect, useState } from 'react';

const STORAGE_KEY = '@AcheAqui:theme';

export default function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEY) || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function changeTheme(nextTheme) {
    setTheme(nextTheme);
  }

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  return { theme, setTheme: changeTheme, toggleTheme };
}
