import { CategoryHeader } from './category-header';
import { CategoryAdsBlock } from './ads-block';

type Props = {
  lng: string;
  categoryId: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const CategoryPage = async ({
  lng,
  categoryId,
  searchParams,
}: Props) => {
  return (
    <main className='flex flex-col gap-10 items-center pb-40'>
      <CategoryHeader
        lng={lng}
        categoryId={categoryId}
        searchParams={searchParams}
      />

      <div className='w-full max-w-7xl px-4 flex flex-col-reverse lg:flex-row gap-6'>
        <CategoryAdsBlock
          lng={lng}
          categoryId={categoryId}
          searchParams={searchParams}
        />
      </div>
    </main>
  );
};
