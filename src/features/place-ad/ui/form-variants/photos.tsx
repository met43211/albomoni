/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { FormEvent, useRef } from 'react';
import { PiPlusCircleBold, PiXBold } from 'react-icons/pi';

type Props = {
  title: string;
  updateForm: (draft: any) => void;
  value: any;
  variants: string[];
};

export const PlaceAdPhotos = ({
  title,
  updateForm,
  value,
  variants,
}: Props) => {
  const { t } = useClientTranslation('inputs');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };

    updateForm((draft: any) => {
      if (draft.fields[title]) {
        draft.fields[title] = [
          ...draft.fields[title],
          ...Object.values(target.files),
        ];
      } else {
        draft.fields[title] = Object.values(target.files);
      }
    });
  };

  const handleOpenInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteFile = (event: any) => {
    const photoIndex = event.target.id;
    const newDraft = value.filter(
      (_file: File, index: number) => index !== Number(photoIndex),
    );
    updateForm((draft: any) => {
      draft.fields[title] = newDraft;
    });
  };

  return (
    <div className='flex gap-4 flex-col'>
      <h5 className='text-md font-medium opacity-50'>{t(`${title}.name`)}</h5>
      <div className='flex gap-4 flex-wrap'>
        {value &&
          Object.values(value).map((image: any, index) => {
            return (
              <div
                key={`image.name.${index}`}
                className='w-28 h-28 rounded-2xl relative'
              >
                <Image
                  src={URL.createObjectURL(image)}
                  width={112}
                  height={112}
                  alt={image.name}
                  className='w-28 h-28 rounded-2xl object-cover'
                />
                <Button
                  size='sm'
                  radius='full'
                  isIconOnly
                  id={index.toString()}
                  onPress={handleDeleteFile}
                  className='absolute right-1 top-1 bg-black/50 backdrop-blur-lg'
                >
                  <PiXBold size={16} />
                </Button>
              </div>
            );
          })}
        {(!value || value?.length < 10) && (
          <Button
            disableRipple
            className='w-28 h-28 bg-[--element]'
            onPress={handleOpenInput}
          >
            <PiPlusCircleBold size={32} className='opacity-50' />
          </Button>
        )}
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
