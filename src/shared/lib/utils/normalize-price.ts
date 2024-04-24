import { getCurrenciesAsync } from '@albomoni/entities/ad/api/get-currencies';

type Props = {
  price: number;
  currency?: string;
  adCurrency?: string;
};

export const normalizePrice = async ({
  price,
  currency = 'USD',
  adCurrency = 'USD',
}: Props) => {
  const currencies: any = await getCurrenciesAsync();

  const locales = {
    RUB: 'ru-RU',
    USD: 'en-US',
    EUR: 'en-GB',
  } as any;

  if (currency === adCurrency)
    return price.toLocaleString(locales[adCurrency], {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });

  const convertedPrice =
    (Number(price) / currencies[adCurrency]) * currencies[currency];

  return Math.round(convertedPrice).toLocaleString(locales[currency], {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });
};
