/* eslint-disable no-param-reassign */

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import * as yup from 'yup';
import { AnimatePresence } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { Map } from '@albomoni/entities/map';
import { TGoogleSuggestion } from '@albomoni/entities/map/model/google-suggestion.type';
import { PlaceAdInputProps } from '../../model/form.type';
import { useCategory } from '../../lib/use-category';

const yupSchema = yup.object({
  address: yup.object().required('required'),
});

export type SuggestionType = {
  value: string;
  data: { [key: string]: string; geo_lat: string; geo_lon: string };
};

export const PlaceAdAddress = memo(
  ({ title, form, updateForm, value }: PlaceAdInputProps) => {
    const { t } = useClientTranslation('place-ad');
    const category = useCategory();

    const [selectedVariant, setSelectedVariant] = useState<TGoogleSuggestion>();

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
          draft.fields[title] = selectedVariant.place_id;
        });
      }
    }, [selectedVariant]);

    return (
      <div className='flex gap-4 flex-col'>
        <h5 className='text-md font-medium opacity-50'>
          {t(`${category}.${title}.name`)}
        </h5>
        <Map setSelectedVariant={setSelectedVariant} />

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
