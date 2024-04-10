/* eslint-disable no-param-reassign */
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { memo } from 'react';
import { PlaceAdInputProps } from '../../model/form.type';

export const PlaceAdSingleSelect = memo(
  ({ title, variants, updateForm, value }: PlaceAdInputProps) => {
    const { t } = useClientTranslation('inputs');

    const handleChange = (selected: string) => {
      updateForm((draft: any) => {
        draft.errors[title] = null;
        draft.fields[title] = selected;
      });
    };

    return (
      <RadioGroup
        label={t(`${title}.name`)}
        value={value || ''}
        onValueChange={handleChange}
        classNames={{ label: 'text-md text-[--text] mb-2 opacity-50' }}
      >
        {variants?.map((variant) => {
          return (
            <Radio key={variant} value={variant}>
              {t(`${title}.${variant}`)}
            </Radio>
          );
        })}
      </RadioGroup>
    );
  },
  (prevProps, nextProps) =>
    prevProps.form?.fields[prevProps.title] ===
    nextProps.form?.fields[prevProps.title],
);
