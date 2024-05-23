'use client';

import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { PiFloppyDiskBold } from 'react-icons/pi';

export const LocationPicker = () => {
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCity, setSelectedCity] = useState();

  return (
    <div className='w-full flex flex-col gap-6 lg:w-1/2'>
      <p className='opacity-50 font-medium -mb-3'>Выберите страну</p>
      <Autocomplete
        defaultItems={countryList}
        aria-label='select country'
        size='lg'
        placeholder='Не выбрано'
      >
        {(item) => <AutocompleteItem key={item}>f</AutocompleteItem>}
      </Autocomplete>
      <p className='opacity-50 font-medium -mb-3 mt-3'>
        Выберите населённый пункт
      </p>
      <Autocomplete
        isDisabled={!selectedCountry}
        defaultItems={cityList}
        aria-label='select city'
        size='lg'
        placeholder='Не выбрано'
      >
        {(item) => <AutocompleteItem key={item}>f</AutocompleteItem>}
      </Autocomplete>

      <Button
        size='lg'
        color='primary'
        variant='shadow'
        className='mt-8 md:w-fit font-medium'
      >
        <PiFloppyDiskBold size={18} />
        Сохранить
      </Button>
    </div>
  );
};
