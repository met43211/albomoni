import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { Fragment } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';

type Props = {
  tips: [string, string, string][];
};

export const SearchTips = ({ tips }: Props) => {
  const { t } = useClientTranslation('place-ad');

  return tips.length > 0 ? (
    <div className='w-full flex flex-col gap-4'>
      {tips.map((tip) => {
        return (
          <Fragment key={tip[2]}>
            <div className='flex gap-2 py-4 px-4 bg-default rounded-2xl flex-wrap'>
              {tip.map((suggestion, indexTip) => {
                return (
                  <div className='flex gap-2' key={suggestion}>
                    <p className='font-medium opacity-80 w-fit text-nowrap'>
                      {t(`categories.${suggestion}`)}
                    </p>
                    {tip.length - 1 > indexTip && <p>{'>'}</p>}
                  </div>
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </div>
  ) : (
    <Placeholder
      icon={<PiMagnifyingGlass size={64} className='opacity-50 mt-10' />}
      title='Ничего не найдено'
      desc='Попробуйте ввести другой запрос'
    />
  );
};
