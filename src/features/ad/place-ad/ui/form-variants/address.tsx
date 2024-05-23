/* eslint-disable no-param-reassign */
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import * as yup from 'yup';
import { AnimatePresence } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { PlaceAdInputProps } from '../../model/form.type';
import { useCategory } from '../../lib/use-category';
import { getGeoSuggestions } from '../../api/get-geo-suggestions/get-geo-suggestions';

const yupSchema = yup.object({
  address: yup.object().required('required'),
});

type SuggestionType = { value: string; data: { [key: string]: string } };

export const PlaceAdAddress = memo(
  ({ title, form, updateForm, value }: PlaceAdInputProps) => {
    const { t } = useClientTranslation('place-ad');
    const category = useCategory();

    // const handleChange = (e: any) => {
    //   const { value: inputValue } = e.target;

    //   try {
    //     yupSchema.validateSync({ address: inputValue });
    //     updateForm((draft: any) => {
    //       draft.errors[title] = null;
    //     });
    //   } catch (err: any) {
    //     updateForm((draft: any) => {
    //       draft.errors[title] = err.message;
    //     });
    //   }

    //   updateForm((draft: any) => {
    //     draft.fields[title] = inputValue;
    //   });
    // };

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
        const response = await getGeoSuggestions(debouncedValue);
        const { suggestions } = await response.json();

        setSuggestList(suggestions as SuggestionType[]);
      };

      if (debouncedValue.length > 2) {
        getSuggests();
      } else {
        setSuggestList([]);
      }
    }, [debouncedValue]);

    useEffect(() => {
      if (selectedVariant) {
        try {
          yupSchema.validateSync({ address: selectedVariant });
          updateForm((draft: any) => {
            draft.errors[title] = null;
          });
        } catch (err: any) {
          updateForm((draft: any) => {
            draft.errors[title] = err.message;
          });
        }

        updateForm((draft: any) => {
          draft.fields[title] = selectedVariant;
        });
      }
    }, [selectedVariant]);

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

    return (
      <div className='flex gap-4 flex-col'>
        <h5 className='text-md font-medium opacity-50'>
          {t(`${category}.${title}.name`)}
        </h5>
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

        <AnimatePresence>
          {form?.errors[title] && (
            <NotificationBubble type='error'>
              {t(`errors.${form.errors[title]}`)}
            </NotificationBubble>
          )}
        </AnimatePresence>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.form?.fields[prevProps.title] ===
    nextProps.form?.fields[prevProps.title],
);
