'use client';

import { ShowFilteredAdsButton } from '@albomoni/features/category/show-filtered-ads';
import {
  AttributesVariables,
  TestCategoriesAttributes,
} from '../model/test-categories-attributes';
import { Attribute } from './attribute';
import { AttributesVariables as AttributesVariablesType } from '../model/category.type';
import { createFilterState } from '../lib/create-filter-state';

type Props = {
  categoryId: string;
};

export const CategoryFilter = ({ categoryId }: Props) => {
  const attr = TestCategoriesAttributes.find(
    (attri) => attri.category_id === categoryId,
  );

  const filterState = createFilterState(attr);

  return (
    <>
      <div className='flex gap-4 flex-wrap' />
      <div className='flex gap-4'>
        <ShowFilteredAdsButton />
      </div>
    </>
  );
};
