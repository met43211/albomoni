/* eslint-disable sonarjs/no-nested-template-literals */
/* eslint-disable react-hooks/rules-of-hooks */

import { useTranslation } from '@albomoni/shared/i18n';
import { Ad } from '../model/ad.type';

export const getAdTitle = async (data: Ad, lng: string) => {
  const { t } = await useTranslation(lng);
  const { title, additional, category } = data.ad;

  if (title) {
    return title;
  }

  const titleVault = {
    real_estate: {
      apartments: `${t(`${additional.rooms_count}`)} квартира, ${
        additional.square
      } м², ${additional.floor}/${additional.floors_house} этаж`,
    },
  } as any;

  return titleVault[category[0]][category[1]];
};
