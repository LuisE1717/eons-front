import { useState, type FormEvent } from "react";
import Cookies from "js-cookie";
import type { Form, PaymentCheck } from "@modules/payment/domain";
import { confirmPayment } from "@modules/payment/infrastructure/paymentApi";

export default function useForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Form>({
    cvv: "",
    expirationDate: "",
    name: "",
    number: "",
    save: false,
  });

  function handleChangeCVV(v: string) {
    setForm((prev) => ({ ...prev, cvv: v }));
  }

  function handleChangeExpirationDate(v: string) {
    setForm((prev) => ({ ...prev, expirationDate: v }));
  }

  function handleChangeName(v: string) {
    setForm((prev) => ({ ...prev, name: v }));
  }

  function handleChangeNumber(v: string) {
    setForm((prev) => ({ ...prev, number: v }));
  }

  function handleChangeSave(v: boolean) {
    setForm((prev) => ({ ...prev, save: v }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
  }

  async function confirm(payload: PaymentCheck) {
    return confirmPayment(Cookies.get("eons_token") || "", payload);
  }

  return {
    form,
    confirm,
    handleChangeCVV,
    handleChangeExpirationDate,
    handleChangeName,
    handleChangeNumber,
    handleChangeSave,
    handleSubmit,
    loading,
  };
}
