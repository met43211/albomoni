/* eslint-disable no-param-reassign */

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Input } from '@nextui-org/input';

type Props = {
  title: string;
  updateForm: (draft: any) => void;
  value: string;
  variants: string[];
};

export const PlaceAdPrice = ({ title, updateForm, value, variants }: Props) => {
  const { t } = useClientTranslation('inputs');

  const handleChange = (e: any) => {
    updateForm((draft: any) => {
      draft.fields[title] = e.target.value;
    });
  };

  return (
    <div className='flex gap-4 flex-col'>
      <h5 className='text-md font-medium opacity-50'>{t(`${title}.name`)}</h5>
      <div className='flex gap-4 items-center'>
        <Input
          size='lg'
          id='price'
          type='text'
          autoComplete='cc-number'
          inputMode='numeric'
          placeholder='0.00'
          min={0}
          value={value || ''}
          onChange={handleChange}
        />
        <p className='opacity-50 text-3xl'>₽</p>
      </div>
    </div>
  );
};
