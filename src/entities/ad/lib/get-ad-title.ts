/* eslint-disable sonarjs/no-nested-template-literals */
/* eslint-disable react-hooks/rules-of-hooks */

import { useTranslation } from '@albomoni/shared/i18n';
import { Ad } from '../model/ad.type';

export const getAdTitle = async (data: Ad, lng: string) => {
  const { t } = await useTranslation(lng, 'place-ad');
  const { title, additional, category } = data.ad;

  if (title) {
    return title;
  }

  const titleVault = {
    real_estate: {
      apartments: `${t(
        `${data.ad.category[0]}.rooms_count.${additional.rooms_count}`,
      )} квартира, ${additional.square} м², ${additional.floor}/${
        additional.floors_house
      } этаж`,
      rooms: `Комната, ${additional.square} м², ${additional.floor}/${additional.floors_house} этаж`,
    },
    transportation: {},
  } as any;

  return titleVault[category[0]][category[1]];
};
