'use client';

import { useMedia } from 'react-use';
import { AdCardMobile } from './ad-card-mobile';
import { AdCardDesktop } from './ad-card-desktop';

export const AdCard = () => {
  const isMobile = useMedia('(max-width: 600px)', false);

  return isMobile ? <AdCardMobile /> : <AdCardDesktop />;
};
