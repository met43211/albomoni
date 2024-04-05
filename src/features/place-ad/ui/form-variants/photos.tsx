/* eslint-disable no-param-reassign */
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button } from '@nextui-org/react';
import { FormEvent, SyntheticEvent, useRef } from 'react';
import { PiPlusCircleBold } from 'react-icons/pi';

type Props = {
  title: string;
  updateForm: (draft: any) => void;
  value: string;
};

export const PlaceAdAPhotos = ({ title, updateForm, value }: Props) => {
  const { t } = useClientTranslation('inputs');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };
    updateForm((draft: any) => {
      draft.fields[title] = target.files;
    });
  };

  const handleOpenInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='flex gap-4 flex-col'>
      <h5 className='text-md font-medium opacity-50'>{t(`${title}.name`)}</h5>
      <div className='flex gap-4 flex-wrap'>
        {/* {value &&
          Object.values(value).map((image) => {
            const file = new FileReader();
            file.readAsDataURL(image);
          })} */}
        <Button
          disableRipple
          className='w-28 h-28 bg-[--element]'
          onPress={handleOpenInput}
        >
          <PiPlusCircleBold size={32} className='opacity-50' />
        </Button>
      </div>
      <input
        type='file'
        accept='image/*'
        multiple
        className='hidden'
        onChange={handleInputChange}
        ref={fileInputRef}
      />
    </div>
  );
};
