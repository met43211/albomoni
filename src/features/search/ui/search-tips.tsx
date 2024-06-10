import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { PiMagnifyingGlass } from 'react-icons/pi';

type Props = {
  tips: string[];
};

export const SearchTips = ({ tips }: Props) => {
  return tips.length > 0 ? (
    <>tips</>
  ) : (
    <Placeholder
      icon={<PiMagnifyingGlass size={64} className='opacity-50 mt-10' />}
      title='Ничего не найдено'
      desc='Попробуйте ввести другой запрос'
    />
  );
};
