/* eslint-disable sonarjs/no-nested-template-literals */
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { PopoverTransitionVariants } from '@albomoni/shared/config/transition-variants';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { CheckboxGroup, Checkbox } from '@nextui-org/checkbox';
import { HiSelector } from 'react-icons/hi';

type Props = {
  selected: string[];
  variants: string[];
  attribute_id: number;
  setSelected: (variant: string[]) => void;
};

export const MultipleSelector = ({
  selected,
  setSelected,
  variants,
  attribute_id,
}: Props) => {
  const { t } = useClientTranslation();

  const handleChange = (collection: string[]) => {
    if (collection.length > 0) {
      setSelected(collection);
    }
  };

  return (
    <Popover
      backdrop='opaque'
      placement='bottom'
      motionProps={PopoverTransitionVariants}
    >
      <PopoverTrigger>
        <div className='w-fit h-min py-2 bg-[--element] dark:bg-blue-500 rounded-xl px-5 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform cursor-pointer'>
          {selected.map((item, index) => {
            if (selected.length !== index + 1) {
              return `${t(`attribute_variables.${attribute_id}.${item}`)}, `;
            }
            return t(`attribute_variables.${attribute_id}.${item}`);
          })}
          <HiSelector size={20} className='mt-[1px] flex-shrink-0' />
        </div>
      </PopoverTrigger>

      <PopoverContent className='w-56 p-4 gap-4 items-start justify-start'>
        <CheckboxGroup
          isRequired
          classNames={{ base: 'w-full flex flex-col', wrapper: 'gap-4 w-full' }}
          value={selected}
          onValueChange={handleChange}
        >
          {variants.map((variant) => (
            <Checkbox
              classNames={{
                base: 'w-full cursor-pointer rounded-lg items-start max-w-full',
                wrapper: 'mt-[3px]',
              }}
              key={variant}
              value={variant}
            >
              {t(`attribute_variables.${attribute_id}.${variant}`)}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </PopoverContent>
    </Popover>
  );
};
