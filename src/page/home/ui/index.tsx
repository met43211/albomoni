import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { Suspense } from 'react';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { CategoriesList } from './categories-list';
import { WelcomeBlock } from './welcome-block';
import { HomeAdsList } from './ads-list';


export const HomePage = ({ lng }: I18nLangParam) => {
  const queryClient = new QueryClient();

  return (
    <main className='flex flex-col gap-14 items-center z-10 pb-40'>
      <WelcomeBlock />

      <CategoriesList lng={lng} />

      <Suspense>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HomeAdsList />
        </HydrationBoundary>
      </Suspense>
    </main>
  );
};
