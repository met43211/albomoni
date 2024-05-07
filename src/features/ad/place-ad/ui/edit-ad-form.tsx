'use client';

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-param-reassign */

import { useImmer } from 'use-immer';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button } from '@nextui-org/button';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { useCookie } from 'react-use';
import { API_URL } from '@albomoni/shared/config';
import { useEffect, useState } from 'react';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { AnimatePresence } from 'framer-motion';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { PlaceAdFormElement, PlaceAdInput } from './form-variants';
import { PlaceAdQueries } from '../api';
import { PlaceAdFormState } from '../model/form.type';
import { countFields } from '../lib/count-fields';
import { CategoryContext } from '../lib/use-category';
import { createFileArray } from '../lib/create-file-array';

type Props = {
  formData: any;
  ad: Ad;
};

export const EditAdForm = ({ formData, ad }: Props) => {
  const { t } = useClientTranslation('place-ad');
  const { mutateAsync } = useMutation(PlaceAdQueries);
  const { user } = useSession();
  const [token] = useCookie('token');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [imgs, setImgs] = useState<File[]>([]);

  const {
    additional,
    cost,
    description,
    geoposition,
    seller,
    currency,
    images,
  } = ad.ad;

  useEffect(() => {
    const loadImages = async () => {
      const imgArray = images.map((img) => img.full);
      const fileArray = await createFileArray(imgArray);
      setImgs(fileArray);
      setIsLoadingImages(false)
    };

    loadImages();
  }, []);

  console.log(imgs);

  const [form, updateForm] = useImmer<PlaceAdFormState>({
    fields: {
      price: { value: cost.toString(), currency },
      description,
      address: geoposition,
      seller,
      photo: imgs,
      ...additional,
    },
    filters: formData.filters,
    errors: {},
  });

  if (isLoadingImages && !imgs) return <>d</>;

  const handleSubmit = async () => {
    const errorsList = Object.entries(form.errors);
    const passedFields = errorsList.filter(
      ([_errKey, errValue]) => errValue === null,
    );

    const isValidForm = passedFields.length === countFields(formData);

    if (!isValidForm) {
      setFormError('error.invalid');
      return;
    }

    setFormError(null);

    const formCopy = _.cloneDeep(form);
    const photoFormData = new FormData();
    const photos = form.fields.photo as File[];

    photos.forEach((img: Blob) => {
      photoFormData.append('file', img);
    });

    delete formCopy.fields.photo;

    const hash = `${user?.user_id}_${Date.now().toString()}`;

    setIsLoading(true);

    try {
      await mutateAsync({ ...formCopy, token, hash });

      await fetch(`${API_URL}place-img/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
          AdId: hash,
        },
        method: 'POST',
        body: photoFormData,
      });
    } catch {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CategoryContext.Provider value={formData.filters[0]}>
      <div className='lg:w-1/2'>
        {Object.keys(formData.sections).map((section) => {
          const inputs = formData.sections[section];
          return (
            <div key={section} className='flex flex-col gap-3 mb-20'>
              <h3 className='text-2xl font-semibold mb-5'>
                {t(`sections.${section}`)}
              </h3>
              <div className='flex flex-col gap-10'>
                {inputs.map((input: PlaceAdInput) => {
                  return (
                    <PlaceAdFormElement
                      key={input.name}
                      name={input.name}
                      type={input.type}
                      variants={input.variants}
                      value={form.fields[input.name] as string}
                      form={form}
                      updateForm={updateForm}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className='flex flex-col gap-4'>
          <Button
            size='lg'
            color='primary'
            variant='shadow'
            onPress={handleSubmit}
            isLoading={isLoading}
            className='w-min'
          >
            Разместить объявление
          </Button>

          <AnimatePresence>
            {formError && (
              <NotificationBubble type='error'>
                Заполните корректно все поля
              </NotificationBubble>
            )}
          </AnimatePresence>
        </div>
      </div>
    </CategoryContext.Provider>
  );
};
