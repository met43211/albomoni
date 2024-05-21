import { getCategoriesAsync } from '@albomoni/entities/menu/api/get-categories';
import { useTranslation } from '@albomoni/shared/i18n';
import { CategoryFilter } from '@albomoni/widgets/category-filter';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import {
  PiCaretRight,
  PiCaretRightBold,
  PiMapPin,
  PiMapPinBold,
} from 'react-icons/pi';

type Props = {
  lng: string;
  categoryId: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const CategoryHeader = async ({
  lng,
  categoryId,
  searchParams,
}: Props) => {
  const { t } = await useTranslation(lng);
  const categories = await getCategoriesAsync();
  const categoryData = categories.find(({ name }) => name === categoryId);

  return (
    <div className='w-full p-6 py-8 md:p-8 md:rounded-3xl bg-gradient-to-tr from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-blue-800/50 flex flex-col gap-8 relative overflow-clip md:pr-48'>
      <h1 className='text-2xl font-bold text-blue-950 dark:text-white'>
        {t(`categories.${categoryId}`)}
      </h1>
      <Button
        radius='full'
        className='w-fit flex gap-2 items-center -mt-3 bg-white text-black opacity-80'
      >
        <PiMapPinBold size={16} />
        <p className='font-medium'>Турция, Анкара</p>
        <PiCaretRightBold className='mt-[2px]' />
      </Button>
      <CategoryFilter categoryId={categoryId} searchParams={searchParams} />
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
  );
};
