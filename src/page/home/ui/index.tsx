import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { AdsList } from '@albomoni/widgets/ads-list';
import { CategoriesList } from './categories-list';
import { WelcomeBlock } from './welcome-block';

export const HomePage = ({ lng }: I18nLangParam) => (
  <main className='flex flex-col gap-14 items-center z-10'>
    <WelcomeBlock />
    <CategoriesList lng={lng} />
    <div className='w-full max-w-7xl px-4'>
      <AdsList
        title='Последние опубликованные объявления'
        titleSize='big'
        cols={4}
      />
    </div>
  </main>
);
