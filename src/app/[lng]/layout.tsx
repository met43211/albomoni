/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */

import { useTranslation } from '@albomoni/shared/i18n';
import { fallbackLng, languages } from '@albomoni/shared/i18n/settings';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { dir } from 'i18next';
import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ScrollToTop } from '@albomoni/shared/lib/utils/scroll-to-top';
import './globals.css';
import Providers from './providers';

type MetadataProps = {
  params: I18nLangParam;
};

type PageProps = MetadataProps & {
  children: React.ReactNode;
};

const font = Inter({ subsets: ['latin', 'cyrillic'] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({ params: { lng } }: MetadataProps) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng);
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children, params: { lng } }: PageProps) {
  return (
    <html suppressHydrationWarning className='dark' lang={lng} dir={dir(lng)}>
      <ScrollToTop />
      <body className={font.className}>
        <Providers lang={lng}>{children}</Providers>
      </body>
    </html>
  );
}
