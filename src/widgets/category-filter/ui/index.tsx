'use client';

import { ShowFilteredAdsButton } from '@albomoni/features/category/show-filtered-ads';
import jsonFilters from '@albomoni/shared/model/filters.json';
import { useState } from 'react';
import { Filter, renderFilterState } from '../lib/render-filter-state';
import { Attribute } from './attribute';
import { FiltersContext } from '../lib/use-filters';
import { FiltersStateContext } from '../lib/use-filters-state';

type Props = {
  categoryId: string;
};

export const CategoryFilter = ({ categoryId }: Props) => {
  const { filters } = JSON.parse(JSON.stringify(jsonFilters));
  const [filterState, setFilterState] = useState(
    renderFilterState(filters[categoryId]),
  );

  return (
    <FiltersContext.Provider value={filters[categoryId]}>
      <FiltersStateContext.Provider value={filterState}>
        <div className='flex gap-4 flex-wrap'>
          {Object.entries(filterState)
            .sort((a: any, b: any) => Math.sign(a[1].order - b[1].order))
            .map(([filterKey, filterParams]) => {
              const { type, variants, selected } = filterParams as Filter;
              return (
                <Attribute
                  key={filterKey}
                  setFilterState={setFilterState}
                  filterKey={filterKey}
                  type={type}
                  variants={variants}
                  selected={selected}
                />
              );
            })}
        </div>
        <div className='flex gap-4'>
          <ShowFilteredAdsButton />
        </div>
      </FiltersStateContext.Provider>
    </FiltersContext.Provider>
  );
};
