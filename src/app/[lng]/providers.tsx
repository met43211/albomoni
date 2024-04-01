'use client';

import { queryClient } from '@albomoni/shared/api/query-client';
import { LanguageProvider } from '@albomoni/shared/lib/providers';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion, domMax } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { Provider as StoreProvider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { store } from '../_env/store';

type Props = {
  children: React.ReactNode;
  lang: string;
};

const Providers = ({ children, lang }: Props) => (
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

export default Providers;
