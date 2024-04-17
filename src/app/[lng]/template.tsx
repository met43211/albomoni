/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function generateViewport() {
  const { resolvedTheme } = useTheme();

  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: resolvedTheme === 'light' ? '#eeeeee' : '#000000',
  };
}

type PageProps = {
  children: React.ReactNode;
};

export default function RootTemplate({ children }: PageProps) {
  const { theme, resolvedTheme } = useTheme();
  const [themeColor, setThemeColor] = useState('#000000');

  useEffect(() => {
    setThemeColor(resolvedTheme === 'light' ? '#eeeeee' : '#000000');
  }, [theme, resolvedTheme]);

  return (
    <>
      <meta name='theme-color' content={themeColor} />
      {children}
    </>
  );
}
