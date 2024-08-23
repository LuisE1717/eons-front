import Button from "../../components/UI/Button/Button";
import useTranslation from "../Shared/hooks/useTranslation";
import P from "./components/P/P";

export default function FailPay() {
  const {translation} = useTranslation()
  return (
    <div className="flex w-full px-6 justify-center">
      <main className="max-w-[700px] w-full flex flex-col pt-10 pb-16">
        <figure className="flex justify-center mb-10 px-4">
          <img
            src="/credit-card.svg"
            alt=""
            className="object-contain w-full md:max-w-[300px] max-w-[220px]"
          />
        </figure>

        <P className="mb-2">
          {translation.Payment.payment_text1}
        </P>

        <div className="flex flex-col gap-y-1.5">
          <P>1- {translation.Payment.payment_text2}</P>
          <P>2- {translation.Payment.payment_text3}</P>
          <P>
            3- {translation.Payment.payment_text4}
          </P>
        </div>

        <P className="mt-3">
          {translation.Payment.payment_text5} (correo de eons soporte)
        </P>

        <section className="flex justify-center mt-5">
          <Button
            loading={false}
            full={false}
            onClick={() => (window.location.href = "/services")}
          >
            {translation.Payment.button}
          </Button>
        </section>
      </main>
    </div>
  );
}
