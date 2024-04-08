/* eslint-disable no-param-reassign */

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Textarea } from '@nextui-org/input';
import * as yup from 'yup';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { AnimatePresence } from 'framer-motion';
import { PlaceAdInputProps } from '../../model/form.type';

const yupSchema = yup.object({
  textarea: yup.string().required('required'),
});

export const PlaceAdTextarea = ({
  title,
  form,
  updateForm,
  value,
}: PlaceAdInputProps) => {
  const { t } = useClientTranslation('inputs');

  const handleChange = (e: any) => {
    const { value: inputValue } = e.target;

    try {
      yupSchema.validateSync({ textarea: inputValue });
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

  return (
    <div className='flex gap-4 flex-col'>
      <h5 className='text-md font-medium opacity-50'>{t(`${title}.name`)}</h5>
      <Textarea size='md' value={value || ''} onChange={handleChange} />

      <AnimatePresence>
        {form?.errors[title] && (
          <NotificationBubble type='error'>
            {t(`errors.${form.errors[title]}`)}
          </NotificationBubble>
        )}
      </AnimatePresence>
    </div>
  );
};
