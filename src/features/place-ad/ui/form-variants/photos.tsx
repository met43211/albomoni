/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { FormEvent, memo, useRef } from 'react';
import { PiPlusCircleBold, PiXBold } from 'react-icons/pi';
import * as yup from 'yup';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { AnimatePresence } from 'framer-motion';
import { PlaceAdInputProps } from '../../model/form.type';

const yupSchema = yup.object({
  images: yup.array().min(3, 'images.min').max(10, 'images.max'),
});

export const PlaceAdPhotos = memo(
  ({ title, form, updateForm, value }: PlaceAdInputProps) => {
    const { t } = useClientTranslation('place-ad');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement & { files: FileList };

      updateForm((draft: any) => {
        if (draft.fields[title]) {
          const imgArray = [
            ...draft.fields[title],
            ...Object.values(target.files),
          ];

          try {
            yupSchema.validateSync({ images: imgArray });
            draft.errors[title] = null;
          } catch (err: any) {
            draft.errors[title] = err.message;
          }

          draft.fields[title] = imgArray;
        } else {
          const imgArray = Object.values(target.files);

          try {
            yupSchema.validateSync({ images: imgArray });
            draft.errors[title] = null;
          } catch (err: any) {
            draft.errors[title] = err.message;
          }

          draft.fields[title] = imgArray;
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
        try {
          yupSchema.validateSync({ images: newDraft });
          draft.errors[title] = null;
        } catch (err: any) {
          draft.errors[title] = err.message;
        }

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
                    className='absolute right-1 top-1 dark:bg-black/50 backdrop-blur-lg'
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

        <AnimatePresence>
          {form?.errors[title] && (
            <NotificationBubble type='error'>
              {t(`errors.${form.errors[title]}`)}
            </NotificationBubble>
          )}
        </AnimatePresence>

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
  },
  (prevProps, nextProps) =>
    prevProps.form?.fields[prevProps.title] ===
    nextProps.form?.fields[prevProps.title],
);
