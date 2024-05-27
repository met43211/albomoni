'use client';

import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { PiFloppyDiskBold } from 'react-icons/pi';
import { useDebounce, useLocalStorage } from 'react-use';
import { SuggestionType } from '@albomoni/features/ad/place-ad/ui/form-variants/address';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { getGeoSuggestionsCity } from '../api/get-countries';
import { saveLocation } from '../api/save-location';

export const LocationPicker = () => {
  const token = getCookie('token');
  const [backPage, , deleteBackPage] = useLocalStorage<string>('back-page');
  const router = useRouter();

  const [inValue, setInValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [suggestList, setSuggestList] = useState<SuggestionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<SuggestionType>();

  useDebounce(
    () => {
      setDebouncedValue(inValue);
      setIsLoading(false);
    },
    2000,
    [inValue],
  );

  useEffect(() => {
    const getSuggests = async () => {
      const response = await getGeoSuggestionsCity(debouncedValue);
      const { suggestions } = await response.json();

      setSuggestList(suggestions as SuggestionType[]);
    };

    if (debouncedValue.length > 2) {
      getSuggests();
    } else {
      setSuggestList([]);
    }
  }, [debouncedValue]);

  const handleSelection = (sel: any) => {
    const selectedSuggest = suggestList.find(
      ({ value: suggestValue }) => suggestValue === sel,
    );
    setSelectedVariant(selectedSuggest);
  };

  const handleInput = (text: string) => {
    setInValue(text);
    if (text.length > 2) {
      setIsLoading(true);
    }
  };

  const handleSubmit = async () => {
    if (selectedVariant?.data) {
      try {
        await saveLocation(
          selectedVariant.data.country_iso_code,
          selectedVariant.data.region_iso_code,
          selectedVariant.data.geoname_id,
          token as string,
        );

        if (backPage) {
          router.replace(backPage);
          deleteBackPage();
        } else {
          router.replace('/');
        }
      } catch {
        return;
      }
    }
  };

  return (
    <div className='w-full flex flex-col gap-6 lg:w-1/2'>
      <p className='opacity-50 font-medium -mb-3'>Выберите город и страну</p>

      <Autocomplete
        size='lg'
        isLoading={isLoading}
        placeholder='Начните вводить адрес'
        aria-label='Address'
        defaultItems={suggestList}
        allowsCustomValue
        endContent={false}
        scrollShadowProps={{
          isEnabled: false,
        }}
        onKeyDown={(e: any) => e.continuePropagation()}
        onSelectionChange={handleSelection}
        onInputChange={handleInput}
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>
        )}
      </Autocomplete>

      {/* <Autocomplete
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
      </Autocomplete> */}

      <Button
        isDisabled={typeof selectedVariant !== 'object'}
        size='lg'
        color='primary'
        variant='shadow'
        className='mt-8 md:w-fit font-medium'
        onPress={handleSubmit}
      >
        <PiFloppyDiskBold size={18} />
        Сохранить
      </Button>
    </div>
  );
};
