/* eslint-disable no-param-reassign */
import { useImmer } from 'use-immer';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button } from '@nextui-org/button';
import { PlaceAdFormElement, PlaceAdInput } from './form-variants';

type Props = {
  formData: any;
};

export const PlaceAdForm = ({ formData }: Props) => {
  const { t } = useClientTranslation('inputs');
  const [form, updateForm] = useImmer<{
    fields: { [key: string]: string | string[] };
    filters: string[];
  }>({
    fields: {},
    filters: formData.filters,
  });

  console.log(form);

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
      <Button size='lg' color='primary' variant='shadow'>
        Разместить объявление
      </Button>
    </div>
  );
};
