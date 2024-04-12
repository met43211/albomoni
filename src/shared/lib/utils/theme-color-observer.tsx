/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */

import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { updateThemeColor } from './update-theme-color';

type Props = {
  children: React.ReactNode;
};

export const ThemeColorObserver = ({ children }: Props) => {
  const { theme, resolvedTheme } = useTheme();
  const [_cookie, setCookie] = useCookies();

  useEffect(() => {
    updateThemeColor(resolvedTheme as 'light' | 'dark');
    setCookie('theme', resolvedTheme);
  }, [theme, resolvedTheme]);

  return children;
};
