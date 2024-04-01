import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { PopoverTransitionVariants } from '@albomoni/shared/config/transition-variants';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { HiSelector } from 'react-icons/hi';

type Props = {
  selected: string;
  variants: string[];
  attribute_id: number;
  setSelected: (variant: string) => void;
};

export const SingleSelector = ({
  selected,
  setSelected,
  variants,
  attribute_id,
}: Props) => {
  const { t } = useClientTranslation();

  return (
    <Popover
      backdrop='opaque'
      placement='bottom'
      motionProps={PopoverTransitionVariants}
    >
      <PopoverTrigger>
        <div className='w-fit h-10 bg-[--element] dark:bg-blue-500 rounded-xl px-5 pb-[2px] flex items-center gap-2 hover:scale-105 active:scale-90 transition-transform cursor-pointer'>
          {t(`attribute_variables.${attribute_id}.${selected}`)}
          <HiSelector size={20} className='mt-[1px]' />
        </div>
      </PopoverTrigger>

      <PopoverContent className='w-56 p-4 gap-4 items-start justify-start'>
        <RadioGroup
          classNames={{ base: 'w-full flex flex-col', wrapper: 'gap-4 w-full' }}
          value={selected}
          onValueChange={setSelected}
        >
          {variants.map((variant) => (
            <Radio
              classNames={{
                base: 'w-full cursor-pointer rounded-lg items-start max-w-full',
                wrapper: 'mt-[3px]',
                labelWrapper: 'w-full',
              }}
              key={variant}
              value={variant}
            >
              {t(`attribute_variables.${attribute_id}.${variant}`)}
            </Radio>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
};
