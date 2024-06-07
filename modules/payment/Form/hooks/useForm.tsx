import { useState, type FormEvent } from "react";
import type { Form } from "../interfaces";

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

  return {
    form,
    handleChangeCVV,
    handleChangeExpirationDate,
    handleChangeName,
    handleChangeNumber,
    handleChangeSave,
    handleSubmit,
    loading,
  };
}
