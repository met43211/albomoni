/* eslint-disable no-param-reassign */
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Input } from '@nextui-org/input';

type Props = {
  title: string;
  updateForm: (draft: any) => void;
  value: string;
};

export const PlaceAdAddress = ({ title, updateForm, value }: Props) => {
  const { t } = useClientTranslation('inputs');

  const handleChange = (e: any) => {
    updateForm((draft: any) => {
      draft.fields[title] = e.target.value;
    });
  };

  return (
    <div className='flex gap-4 flex-col'>
      <h5 className='text-md font-medium opacity-50'>{t(`${title}.name`)}</h5>
      <Input
        size='lg'
        id='address'
        type='text'
        onChange={handleChange}
        value={value || ''}
      />
    </div>
  );
};
