import { useTranslation } from '@albomoni/shared/i18n';
import { ButtonLight } from '@albomoni/shared/ui/button-light/ui';
import Link from 'next/link';
import {
  PiChatBold,
  PiFolderBold,
  PiFolderPlusBold,
  PiHeartBold,
  PiMapPinBold,
} from 'react-icons/pi';

type Props = {
  lang: string;
};

export const TopBar = async ({ lang }: Props) => {
  const location = 'Турция, Анкара';
  const { t } = await useTranslation(lang);

  return (
    <div className='w-full h-12 max-w-7xl px-4 flex justify-between items-center'>
      <ButtonLight>
        <PiMapPinBold />
        <p className='text-sm font-normal'>{location}</p>
      </ButtonLight>
      <div className='flex gap-5 lg:gap-10'>
        <Link href='/place-ad'>
          <ButtonLight>
            <PiFolderPlusBold />
            <p className='text-sm font-normal'>{t('create-ad')}</p>
          </ButtonLight>
        </Link>
        <ButtonLight>
          <PiFolderBold />
          <p className='text-sm font-normal'>{t('my-ads')}</p>
        </ButtonLight>
        <ButtonLight>
          <PiChatBold />
          <p className='text-sm font-normal'>{t('messages')}</p>
        </ButtonLight>
        <ButtonLight>
          <PiHeartBold />
          <p className='text-sm font-normal'>{t('featured')}</p>
        </ButtonLight>
      </div>
    </div>
  );
};
