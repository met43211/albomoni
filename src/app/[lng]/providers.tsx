'use client';

import { LanguageProvider } from '@albomoni/shared/lib/providers';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion, domMax } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { Provider as StoreProvider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { useState } from 'react';
import { store } from '../_env/store';

type Props = {
  children: React.ReactNode;
  lang: string;
};

const Providers = ({ children, lang }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <QueryClientProvider client={queryClient}>
        <StoreProvider store={store}>
          <LazyMotion features={domMax}>
            <NextUIProvider>
              <ThemeProvider
                attribute='class'
                enableSystem={false}
                defaultTheme='light'
              >
                <LanguageProvider lang={lang}>{children}</LanguageProvider>
              </ThemeProvider>
            </NextUIProvider>
          </LazyMotion>
        </StoreProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default Providers;
