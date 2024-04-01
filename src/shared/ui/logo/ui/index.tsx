'use client';

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { AlbomoniSvg } from '..';

export const Logo = () => {
  const { t } = useClientTranslation();

  return (
    <div className='w-full flex flex-col gap-2 mt-1 relative justify-center items-center'>
      <AlbomoniSvg />
      <p className='w-full text-[10.5px] pl-[1px] text-center font-light tracking-[2px] uppercase whitespace-nowrap'>
        {t('short-description')}
      </p>
    </div>
  );
};
