import { cookies } from 'next/headers';

type Props = {
  lng?: string;
  price: number;
};

export const normalizePrice = ({ lng = 'ru', price }: Props) => {
  const currency = cookies().get('currency');

  const locales = {
    ru: 'ru-RU',
    en: 'en-IN',
  } as any;

  return price.toLocaleString(locales[lng], {
    style: 'currency',
    currency: currency?.value || 'USD',
    maximumFractionDigits: 0,
  });
};
