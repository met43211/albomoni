import { luhnCheck } from '@albomoni/page/personal/billing/lib/luhn-check';
import * as yup from 'yup';

const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
const currentYear = new Date().getFullYear() % 100;
const currentMonth = new Date().getMonth() + 1;
const internationalPhoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

export const BillingSchema = yup
  .object({
    sum: yup
      .number()
      .min(100)
      .integer('Сумма должна быть целым числом')
      .required(),
    'card-number': yup
      .string()
      .required('Card number is required')
      .test('is-valid-card-number', 'Card number is not valid', (value) =>
        luhnCheck(value || ''),
      )
      .matches(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|220[0-4][0-9]{12})$/,
        'Card number is not valid',
      )
      .min(13, 'Card number must be at least 13 digits')
      .max(19, 'Card number must be at most 19 digits'),
    email: yup.string().email('incorrect email'),
    'card-date': yup
      .string()
      .required('Expiry date is required')
      .matches(expiryDateRegex, 'Expiry date format is MM/YY')
      .test('expiryDate', 'Expiry date is in the past', (value) => {
        if (!value) return false;

        const [month, year] = value.split('/').map(Number);
        return (
          year > currentYear || (year === currentYear && month >= currentMonth)
        );
      }),
    cvv: yup
      .string()
      .required('CVV is required')
      .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
    tel: yup
      .string()
      .required('Phone number is required')
      .matches(
        internationalPhoneRegex,
        'Phone number is not valid, it should start with "+"',
      ),
  })
  .required();
