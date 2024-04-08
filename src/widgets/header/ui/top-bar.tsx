import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { ButtonLight } from '@albomoni/shared/ui/button-light/ui';
import {
  PiFolderBold,
  PiMapPinBold,
} from 'react-icons/pi';

export const TopBar = () => {
  const location = 'Турция, Анкара';
  const { t } = useClientTranslation();

  return (
    <div className='w-full h-12 max-w-7xl px-4 flex justify-between items-center'>
      <ButtonLight>
        <PiMapPinBold />
        <p className='text-sm font-normal'>{location}</p>
      </ButtonLight>
      <div className='flex gap-5 lg:gap-10'>
        {/* <Link href='/place-ad'>
          <ButtonLight>
            <PiFolderPlusBold />
            <p className='text-sm font-normal'>{t('create-ad')}</p>
          </ButtonLight>
        </Link> */}
        <ButtonLight>
          <PiFolderBold />
          <p className='text-sm font-normal'>{t('my-ads')}</p>
        </ButtonLight>
        {/* <ButtonLight>
          <PiChatBold />
          <p className='text-sm font-normal'>{t('messages')}</p>
        </ButtonLight>
        <ButtonLight>
          <PiHeartBold />
          <p className='text-sm font-normal'>{t('featured')}</p>
        </ButtonLight> */}
      </div>
    </div>
  );
};
