import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import useTranslation from "../Shared/hooks/useTranslation";
import Span from "../Services/shared/components/Span/Span";
import Modal from "./components/modal";
import { postMesagges } from "../../utils/api/evaluation";
import { toast } from "react-toastify";

export default function Inf({ token }: { token: string }) {
  const { translation } = useTranslation();
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);
  const [showEtp1Modal, setShowEtp1Modal] = useState(false);
  const [showEtp2Modal, setShowEtp2Modal] = useState(false);
  const [hasEtp1, setHasEtp1] = useState(false);
  const [etp1Results, setEtp1Results] = useState<string[]>([]);
  const [etp2Results, setEtp2Results] = useState<string[]>([]);

  const getEtp1Results = async () => {
    const dat = JSON.parse(localStorage.getItem("etp1") ?? "null");
    if (dat === null) return;

    const body = {
      type: "evaluacion-etapa1",
      language: "es",
      hexResults: dat,
    };

    const response = await postMesagges(token, body);
    const data = response.data;

    // Convertir el objeto a un array de strings
    setEtp1Results(formatResults(data));
    setShowEtp1Modal(true);
  };

  const getEtp2Results = async () => {
    const dat = JSON.parse(localStorage.getItem("etp2") ?? "null");
    if (dat === null) return;

    const body = {
      type: "evaluacion-etapa2",
      language: "es",
      hexResults: dat,
    };

    const response = await postMesagges(token, body);
    const data = response.data;

    // Convertir el objeto a un array de strings
    setEtp2Results(formatResults(data));
    setShowEtp2Modal(true);
  };

  // Función para formatear los resultados como array de strings
  const formatResults = (data: any): string[] => {
    if (typeof data === "string") {
      return data.split("\n"); // Si es string, dividir por líneas
    } else if (Array.isArray(data)) {
      return data.map((item) => item.toString()); // Si es array, convertir elementos a string
    } else if (typeof data === "object") {
      return Object.values(data).map((item) => item.toString()); // Si es objeto, extraer valores y convertir a string
    }
    return ["Formato desconocido de resultados"]; // Fallback en caso de error
  };

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
        onClose={() => setShowEtp1Modal(false)}
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
        onClose={() => setShowEtp2Modal(false)}
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
