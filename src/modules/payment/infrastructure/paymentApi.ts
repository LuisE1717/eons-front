import { axiosI } from "@modules/Shared/infrastructure/httpClient";
import type { PaymentCheck } from "@modules/payment/domain";

export async function confirmPayment(token: string, dataH: PaymentCheck) {
  const res = await axiosI(token).post(`/tropipay/validate-payment`, dataH);
  const data = await res.data;

  return {
    data: data,
  };
}
