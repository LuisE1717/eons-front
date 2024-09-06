import React, { useState, type FormEvent } from "react";
import Button from "../../../../../../components/UI/Button/Button";
import Section from "./components/Section/Section";
import { validMail } from "../../../../../../utils/validations";
import { toast } from "react-toastify";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import { transferEssence } from "../../../../../../utils/api/essenceApi";
import Cookies from "js-cookie";
import { setCookie } from "../../../../../../utils/cookies/Cookies";
import Modal from "./components/Modal/Modal";
import type { ModalProps } from "./domain";
interface IForm {
  count: number;
  user: string;
}

interface Props {
  handleClose(): void;
}

export default function Form({ handleClose }: Props) {
  const { translation } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<IForm>({ count: 1, user: "" });
  const [openModal, setOpenModal] = useState<ModalProps | null>(null);

  function handleChangeCount(c: number) {
    setForm((prev) => ({ ...prev, count: c }));
  }

  async function handleSubmit() {
    setLoading(true);

    try {
      if (validMail(form.user)) {
        const datah = {
          receiver: form.user,
          amount: form.count,
        };
        await transferEssence(Cookies.get("eons_token") || "", datah)
          .then(({ data }) => {
            if (data?.essence) {
              setCookie("eons_essence", data?.essence, 0.25);
              setOpenModal(null);
              toast.success(
                `Se transferido ${form.count} de Esencia a ${form.user} exitosamente`
              );

              setTimeout(() => {
                window.location.reload();
              }, 4000);
            }
          })
          .catch(({ response }) => {
            setOpenModal(null);

            if (response?.data?.message == "Insufficient essence") {
              toast.error(translation.Esence.insuficent_error);
            } else if (response?.data?.message == "Receiver not found") {
              toast.error(translation.Esence.not_found);
            } else if (
              response?.data?.message == "amount must not be less than 1"
            ) {
              toast.error(translation.Esence.at_least_error);
            } else {
              toast.error(translation.fecth_error);
            }
          });
      }

      setLoading(false);
    } catch (error) {
      toast.error(translation.fecth_error);
      setLoading(false);
    }
  }

  function handleChangeUser(u: string) {
    setForm((prev) => ({ ...prev, user: u }));
  }

  return (
    <div className="flex flex-col w-full max-w-[600px] bg-white sm:px-14 px-8 sm:py-8 py-6 rounded-2xl shadow-lg">
      <Modal
        handleSubmit={handleSubmit}
        open={Boolean(openModal)}
        handleClose={() => setOpenModal(null)}
        loading={loading}
        count={form.count}
        to={form.user}
      />

      <section className="flex justify-end">
        <button type="button" onClick={handleClose}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8L40 40"
              stroke="#000000"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 40L40 8"
              stroke="#000000"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </section>

      <form
        className="flex flex-col w-full gap-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          setOpenModal({ id: "transfer" });
        }}
      >
        <Section label={translation.Esence.user_transfer}>
          <input
            type="text"
            disabled={loading}
            value={form.user}
            placeholder={translation.Esence.user_transfer_holder}
            onChange={(e) => handleChangeUser(e.target.value)}
            className="outline-none w-full border-b-2 border-gray-300 pb-1.5 focus:border-primary transition-all duration-200"
          />
        </Section>

        <Section label={translation.Esence.cant_transfer}>
          <input
            disabled={loading}
            type="text"
            className="py-1.5 outline-none border-b-2 focus:border-b-primary border-gray-300 w-full text-base focus:border-gray-400"
            value={form.count}
            min={1}
            onChange={(e) => handleChangeCount(Number(e.target.value))}
          />
        </Section>

        <Button
          disabled={!validMail(form.user)}
          type="submit"
          loading={loading}
          full={true}
          size="base"
        >
          {translation.Esence.transfer}
        </Button>
      </form>
    </div>
  );
}
