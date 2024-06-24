import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { PiMagnifyingGlass } from 'react-icons/pi';

type Props = {
  tips: [string, string, string][];
};

export const SearchTips = ({ tips }: Props) => {
  return tips.length > 0 ? (
    <div className='flex flex-col gap4'>
      {tips.map((tip) => {
        return (
          <div key={tip[2]} className='flex gap-2'>
            {tip.map((suggestion) => {
              return <p key={suggestion}>{suggestion}</p>;
            })}
          </div>
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
