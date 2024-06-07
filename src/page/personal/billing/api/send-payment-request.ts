import { paymentClient } from '@albomoni/shared/api/base';

export const sendPaymentRequest = (
  amount: string,
  cryptogram: string,
  email: string,
  phone: string,
  isSaveData: boolean,
) =>
  paymentClient.post('bill/', { amount, cryptogram, email, phone, isSaveData });
