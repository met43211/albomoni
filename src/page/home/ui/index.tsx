import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { Suspense } from 'react';
import { CategoriesList } from './categories-list';
import { WelcomeBlock } from './welcome-block';
import { HomeAdsList } from './ads-list';
import { CategoriesListSkeleton } from './categories-list/skeleton';

export const HomePage = async ({ lng }: I18nLangParam) => {
  return (
    <main className='flex flex-col gap-14 items-center z-10 pb-40'>
      <WelcomeBlock />

      <Suspense fallback={<CategoriesListSkeleton />}>
        <CategoriesList lng={lng} />
      </Suspense>

      <Suspense>
        <HomeAdsList />
      </Suspense>
    </main>
  );
};
