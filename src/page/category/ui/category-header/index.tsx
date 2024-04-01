import { TestCategories } from '@albomoni/page/home/model/test-categories';
import { useTranslation } from '@albomoni/shared/i18n';
import { CategoryFilter } from '@albomoni/widgets/category-filter';
import Image from 'next/image';

type Props = {
  lng: string;
  categoryId: string;
};

export const CategoryHeader = async ({ lng, categoryId }: Props) => {
  const { t } = await useTranslation(lng);

  const categoryData = TestCategories.find(({ id }) => id === categoryId);

  return (
    <div className='w-full max-w-7xl px-4 flex flex-col gap-10'>
      <div className='w-full p-8 rounded-3xl bg-gradient-to-tr from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-blue-800/50 flex flex-col gap-8 relative overflow-clip md:pr-48'>
        <h1 className='text-2xl font-bold text-blue-950 dark:text-white'>
          {t(`categories.${categoryId}`)}
        </h1>
        <CategoryFilter categoryId={categoryId} />
        {categoryData && (
          <Image
            className='hidden md:block absolute -bottom-5 right-0'
            width={240}
            height={240}
            src={categoryData.img}
            alt={categoryId}
          />
        )}
      </div>
    </div>
  );
};
