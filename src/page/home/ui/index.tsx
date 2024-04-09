import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { Suspense } from 'react';
import { CategoriesList } from './categories-list';
import { WelcomeBlock } from './welcome-block';
import { HomeAdsList } from './ads-list';

export const HomePage = async ({ lng }: I18nLangParam) => {
  return (
    <main className='flex flex-col gap-14 items-center z-10 pb-40'>
      <WelcomeBlock />

      <CategoriesList lng={lng} />

      <Suspense>
        <HomeAdsList />
      </Suspense>
    </main>
  );
};
