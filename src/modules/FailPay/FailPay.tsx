import Button from "../../components/UI/Button/Button";
import P from "./components/P/P";

export default function FailPay() {
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
          La compra de esencia ha fallado, esto se puede deber a varias razones,
          por lo que le recomendamos
        </P>

        <div className="flex flex-col gap-y-1.5">
          <P>1- Revisar su wallet o tarjeta bancaria usada en la compra</P>
          <P>2- Verificar su conexión a internet</P>
          <P>
            3- Volver a realizar el proceso de compra, puedo haber sido un error
            temporal
          </P>
        </div>

        <P className="mt-3">
          En caso de realizar los pasos anteriores y obtener el mismo error,
          contacte con (correo de eons soporte)
        </P>

        <section className="flex justify-center mt-5">
          <Button
            loading={false}
            full={false}
            onClick={() => (window.location.href = "/")}
          >
            Volver al menú principal
          </Button>
        </section>
      </main>
    </div>
  );
}
