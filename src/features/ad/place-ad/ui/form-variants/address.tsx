/* eslint-disable no-param-reassign */
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import * as yup from 'yup';
import { AnimatePresence } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { Input } from '@nextui-org/input';
import { useDebounce } from 'react-use';
import 'react-dadata/dist/react-dadata.css';
import { PlaceAdInputProps } from '../../model/form.type';
import { useCategory } from '../../lib/use-category';
import { getGeoSuggestions } from '../../api/get-geo-suggestions/get-geo-suggestions';

const yupSchema = yup.object({
  address: yup.string().required('required'),
});

export const PlaceAdAddress = memo(
  ({ title, form, updateForm, value }: PlaceAdInputProps) => {
    const { t } = useClientTranslation('place-ad');
    const category = useCategory();

    const handleChange = (e: any) => {
      const { value: inputValue } = e.target;

      try {
        yupSchema.validateSync({ address: inputValue });
        updateForm((draft: any) => {
          draft.errors[title] = null;
        });
      } catch (err: any) {
        updateForm((draft: any) => {
          draft.errors[title] = err.message;
        });
      }

      updateForm((draft: any) => {
        draft.fields[title] = inputValue;
      });
    };

    const [inValue, setInValue] = useState<string>('');
    const [debouncedValue, setDebouncedValue] = useState('');

    useDebounce(
      () => {
        setDebouncedValue(inValue);
      },
      2000,
      [inValue],
    );

    useEffect(() => {
      const getSuggests = async () => {
        const response = await getGeoSuggestions(debouncedValue);
        const { suggestions } = await response.json();

        console.log(suggestions);
      };

      if (debouncedValue.length > 2) {
        getSuggests();
      }
    }, [debouncedValue]);

    return (
      <div className='flex gap-4 flex-col'>
        <h5 className='text-md font-medium opacity-50'>
          {t(`${category}.${title}.name`)}
        </h5>
        <Input
          size='lg'
          id='address'
          type='text'
          aria-label='Address'
          onChange={(e) => setInValue(e.target.value)}
          value={inValue}
        />

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
