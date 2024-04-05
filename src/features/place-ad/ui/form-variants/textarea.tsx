/* eslint-disable no-param-reassign */

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Textarea } from '@nextui-org/input';

type Props = {
  title: string;
  updateForm: (draft: any) => void;
  value: string;
};

export const PlaceAdTextarea = ({ title, updateForm, value }: Props) => {
  const { t } = useClientTranslation('inputs');

  const handleChange = (e: any) => {
    updateForm((draft: any) => {
      draft.fields[title] = e.target.value;
    });
  };

  return (
    <div className='flex gap-4 flex-col'>
      <h5 className='text-md font-medium opacity-50'>{t(`${title}.name`)}</h5>
      <Textarea size='md' value={value || ''} onChange={handleChange} />
    </div>
  );
};
