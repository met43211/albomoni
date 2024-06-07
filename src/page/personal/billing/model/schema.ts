import * as yup from 'yup';

export const BillingSchema = yup
  .object({
    sum: yup
      .number()
      .min(100)
      .integer('Сумма должна быть целым числом')
      .required(),
    'card-number': yup
      .number()
      .min(100)
      .integer('Сумма должна быть целым числом')
      .required(),
  })
  .required();
