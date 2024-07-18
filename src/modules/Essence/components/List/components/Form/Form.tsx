import React, { useState, type FormEvent } from "react";
import Button from "../../../../../../components/UI/Button/Button";
import Section from "./components/Section/Section";
import { validMail } from "../../../../../../utils/validations";
import { toast } from "react-toastify";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import { transferEssence } from "../../../../../../utils/api/essenceApi";
import Cookies from "js-cookie";
interface IForm {
  count: number;
  user: string;
}

export default function Form() {
  const {translation} = useTranslation()

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<IForm>({ count: 100, user: "" });

  function handleChangeCount(c: number) {
    setForm((prev) => ({ ...prev, count: c }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    try {
      if(validMail(form.user) && form.count>10){
        const datah = {
          receiver: form.user,
          amount: form.count
        }
        await transferEssence(Cookies.get('eons_token') || '',datah)
        .then(() => {
          toast.success(`Se transferido ${form.count} esencias a ${form.user} exitosamente`)
        })
        .catch(() => toast.error(translation.fecth_error))
      }
      setLoading(false);
    } catch (error) {
      toast.error(translation.fecth_error)
      setLoading(false);
    }
  }

  function handleChangeUser(u: string) {
    setForm((prev) => ({ ...prev, user: u }));
  }

  return (
    <div className="flex flex-col w-full max-w-[600px] bg-white sm:px-14 px-8 sm:py-8 py-6 rounded-2xl shadow-lg">
      <section className="flex justify-start"></section>

      <form className="flex flex-col w-full gap-y-8" onSubmit={handleSubmit}>
        <Section label="Usuario a transferir">
          <input
            type="text"
            disabled={loading}
            value={form.user}
            placeholder="Nombre del usuario"
            onChange={(e) => handleChangeUser(e.target.value)}
            className="outline-none w-full border-b-2 border-gray-300 pb-1.5 focus:border-primary transition-all duration-200"
          />
        </Section>

        <Section label="Cantidad a transferir">
          <input
            disabled={loading}
            type="number"
            className="py-1.5 outline-none border-b-2 focus:border-b-primary border-gray-300 w-full text-base focus:border-gray-400"
            value={form.count}
            min={10}
            onChange={(e) => handleChangeCount(Number(e.target.value))}
          />
        </Section>

        <Button disabled={!validMail(form.user)}
         type="submit" loading={loading} full={true} size="base">
          Transferir
        </Button>
      </form>
    </div>
  );
}
