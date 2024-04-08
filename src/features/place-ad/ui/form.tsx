/* eslint-disable no-param-reassign */
import { useImmer } from 'use-immer';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button } from '@nextui-org/button';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { useCookie } from 'react-use';
import { API_URL } from '@albomoni/shared/config';
import { PlaceAdFormElement, PlaceAdInput } from './form-variants';
import { PlaceAdQueries } from '../api';

type Props = {
  formData: any;
};

export const PlaceAdForm = ({ formData }: Props) => {
  const { t } = useClientTranslation('inputs');
  const { mutateAsync, isPending } = useMutation(PlaceAdQueries);
  const [token] = useCookie('token');

  const [form, updateForm] = useImmer<{
    fields: { [key: string]: string | string[] | FormData | File[] };
    filters: string[];
  }>({
    fields: {},
    filters: formData.filters,
  });

  const handleSubmit = async () => {
    const formCopy = _.cloneDeep(form);
    const photoFormData = new FormData();
    const photos = form.fields.photo as File[];

    photos.forEach((img: Blob) => {
      photoFormData.append('file', img);
    });
    delete formCopy.fields.photo;

    const hash = Math.random() * 100000000000000000;

    await mutateAsync({ ...formCopy, token, hash });

    await fetch(`${API_URL}place-ad/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
        AdId: hash.toString(),
      },
      method: 'POST',
      body: photoFormData,
    });

    
  };

  return (
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
                    updateForm={updateForm}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <Button
        size='lg'
        color='primary'
        variant='shadow'
        onPress={handleSubmit}
        isLoading={isPending}
      >
        Разместить объявление
      </Button>
    </div>
  );
};
