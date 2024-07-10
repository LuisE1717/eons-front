import React, { useState, type FormEvent } from "react";
import Button from "../../../../../../components/UI/Button/Button";
import Section from "./components/Section/Section";

interface IForm {
  count: number;
  user: string;
}

export default function Form() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<IForm>({ count: 1000, user: "" });

  function handleChangeCount(c: number) {
    setForm((prev) => ({ ...prev, count: c }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
  }

  function handleChangeUser(u: string) {
    setForm((prev) => ({ ...prev, user: u }));
  }

  return (
    <div className="flex flex-col w-full bg-white rounded px-7 py-4">
      <form className="flex flex-col w-full gap-y-5" onSubmit={handleSubmit}>
        <Section label="Usuario">
          <input
            type="text"
            disabled={loading}
            value={form.user}
            onChange={(e) => handleChangeUser(e.target.value)}
            className="outline-none w-full border-b-2 border-gray-300 pb-1.5 focus:border-gray-400 transition-all duration-200"
          />
        </Section>

        <Section label="Cantidad">
          <input
            disabled={loading}
            type="number"
            className="px-3.5 py-1.5 outline-none border-2 border-gray-300 rounded w-full text-base focus:border-gray-400"
            value={form.count}
            min={1000}
            onChange={(e) => handleChangeCount(Number(e.target.value))}
          />
        </Section>

        <section className="w-full flex justify-end">
          <Button type="submit" loading={loading} full={false} size="sm">
            Transferir
          </Button>
        </section>
      </form>
    </div>
  );
}
