'use client';

import { useLocalStorage } from 'react-use';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Map } from '@albomoni/entities/map';
import { useState } from 'react';
import { TGoogleSuggestion } from '@albomoni/entities/map/model/google-suggestion.type';

export const LocationPicker = () => {
  const token = getCookie('token');
  const [backPage, , deleteBackPage] = useLocalStorage<string>('back-page');
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<TGoogleSuggestion>();

  return (
    <>
      <div className='w-full flex flex-col gap-6 lg:w-1/2'>
        <p className='opacity-50 font-medium -mb-3'>Выберите город и страну</p>
      </div>
      <Map setSelectedVariant={setSelectedVariant} onSave={() => {}} />
    </>
  );
};
