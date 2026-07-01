import { useEffect, useState } from "react";
import Button from "@components/UI/Button/Button";
import useTranslation from "@modules/Shared/hooks/useTranslation";
import Span from "@modules/Shared/components/Span/Span";
import Modal from "./components/modal";
import useEvaluationResults from "../application/useEvaluationResults";
import { toast } from "react-toastify";

export default function Inf({ token }: { token: string }) {
  const { translation } = useTranslation();
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);
  const [hasEtp1, setHasEtp1] = useState(false);
  const {
    showEtp1Modal,
    showEtp2Modal,
    etp1Results,
    etp2Results,
    getEtp1Results,
    getEtp2Results,
    closeEtp1Modal,
    closeEtp2Modal,
  } = useEvaluationResults(token);

  useEffect(() => {
    const etp1 = localStorage.getItem("etp1") ?? "null";
    const etp2 = localStorage.getItem("etp2") ?? "null";

    if (etp1 === "null" && etp2 === "null") {
      setMessage(translation.ServiceMenu.etp1);
    } else if (etp1 !== "null" && etp2 === "null") {
      setHasEtp1(true);
      setMessage(translation.ServiceMenu.etp2);
    } else if (etp1 !== "null" && etp2 !== "null") {
      setCompleted(true);
      setMessage(translation.ServiceMenu.etp3);
    }
  }, []);

  const handleRoute = () => completed ? toast.warning('Este servicio estará disponible en los próximos días.') : window.location.href = "/launch";

  return (
    <main className="flex w-full px-10 mb-10 justify-center">
      <div className="flex lg:flex-row flex-col w-full gap-y-10 max-w-[1100px] justify-center items-center">
        <img src="/lens.webp" alt="lens" className="object-contain w-full max-w-[600px]" />

        <div className="w-full max-w-[500px] flex flex-col items-center gap-4">
        <p className="text-lg mb-5 text-gray-500 text-center">
            La Evaluación general es un servicio que se debe realizar una sola vez en la vida.
          </p>

          <Button onClick={handleRoute}  loading={false} full={false}>
            <div>
              {translation.ServiceMenu.general_evaluation}.<br /> {message}
              <div>
                (<Span color="secundary">{translation.ServiceMenu.free}</Span>)
              </div>
            </div>
          </Button>

          {(hasEtp1 || completed) && (
            <Button loading={false} onClick={() => getEtp1Results()} full={false}>
              Ver resultados Etapa 1
            </Button>
          )}

          {completed && (
            <Button loading={false} onClick={() => getEtp2Results()} full={false}>
              Ver resultados Etapa 2
            </Button>
          )}
        </div>
      </div>

      {/* Modales con los resultados divididos en array */}
      <Modal
        isOpen={showEtp1Modal}
        etapa="Etapa 1"
        onClose={closeEtp1Modal}
        title="Resultados Etapa 1"
      >
        {etp1Results.length > 0 ? (
          etp1Results.map((msg, index) => <p key={index}>{msg}</p>)
        ) : (
          <p>Cargando resultados...</p>
        )}
      </Modal>

      <Modal
        isOpen={showEtp2Modal}
        etapa="Etapa 2"
        onClose={closeEtp2Modal}
        title="Resultados Etapa 2"
      >
        {etp2Results.length > 0 ? (
          etp2Results.map((msg, index) => <p key={index}>{msg}</p>)
        ) : (
          <p>Cargando resultados...</p>
        )}
      </Modal>
    </main>
  );
}
