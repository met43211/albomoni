import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { useTranslation } from '@albomoni/shared/i18n';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import Link from 'next/link';
import Image from 'next/image';
import { TestCategories } from '../../model/test-categories';

export const CategoriesList = async ({ lng }: I18nLangParam) => {
  const { t } = await useTranslation(lng);

  return (
    <div className='w-full flex flex-col max-w-7xl gap-8'>
      <h2 className='text-xl md:text-2xl font-bold px-4'>Категории</h2>
      <ScrollShadow
        orientation='horizontal'
        hideScrollBar
        className='grid grid-flow-col grid-rows-2 sm:flex sm:flex-row gap-4 py-1 px-4 overflow-y-hidden'
      >
        {TestCategories.map((category) => (
          <Link
            key={category.id}
            as={`categories/${category.id}`}
            href='categories/[categoryId]'
            className='w-36 h-48 bg-[--element] rounded-2xl p-4 items-start justify-start flex-shrink-0 hover:scale-105 active:scale-95 transition-transform relative'
          >
            <p className='text-sm font-semibold'>
              {t(`categories.${category.id}`)}
            </p>
            <Image
              className='absolute bottom-0 right-0'
              width={150}
              height={150}
              src={category.img}
              alt={category.id}
            />
          </Link>
        ))}
      </ScrollShadow>
    </div>
  );
};