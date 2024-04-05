/* eslint-disable no-param-reassign */
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { RadioGroup, Radio } from '@nextui-org/radio';

type Props = {
  title: string;
  variants: string[];
  updateForm: (draft: any) => void;
  value: string;
};

export const PlaceAdSingleSelect = ({
  title,
  variants,
  updateForm,
  value,
}: Props) => {
  const { t } = useClientTranslation('inputs');

  const handleChange = (selected: string) => {
    updateForm((draft: any) => {
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
      {variants.map((variant) => {
        return (
          <Radio key={variant} value={variant}>
            {t(`${title}.${variant}`)}
          </Radio>
        );
      })}
    </RadioGroup>
  );
};
