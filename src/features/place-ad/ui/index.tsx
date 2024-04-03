'use client';

import jsonFilters from '@albomoni/shared/model/filters.json';

export const PlaceAd = () => {
  const { filters } = JSON.parse(JSON.stringify(jsonFilters));
  const categoriesList = Object.keys(filters);
  console.log(categoriesList);

  return (
    <div className='w-full'>
      <p>Для начала, выберите категорию объявления</p>
    </div>
  );
};
