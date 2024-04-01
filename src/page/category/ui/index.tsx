import { AdsList } from '@albomoni/widgets/ads-list/ui';
import { CategoryHeader } from './category-header';

type Props = {
  lng: string;
  categoryId: string;
};

export const CategoryPage = ({ lng, categoryId }: Props) => (
  <main className='flex flex-col gap-10 items-center'>
    <CategoryHeader lng={lng} categoryId={categoryId} />
    <div className='w-full max-w-7xl px-4 flex flex-col-reverse lg:flex-row gap-6'>
      <AdsList title='Недавние объявления' cols={4} />
      {/* <div className='flex flex-col gap-8 w-96 '>
        <ShowHistoryButton />
      </div> */}
    </div>
  </main>
);
