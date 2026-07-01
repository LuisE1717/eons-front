import { useState } from "react";
import { postMesagges } from "@modules/Launch/infrastructure/evaluationApi";

// Use case: fetch and format the stored stage evaluations so the component can
// show them in a modal without talking to the API directly.
export default function useEvaluationResults(token: string) {
  const [showEtp1Modal, setShowEtp1Modal] = useState(false);
  const [showEtp2Modal, setShowEtp2Modal] = useState(false);
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
      return data.map((item) => String(item)); // Si es array, convertir elementos a string
    } else if (typeof data === "object") {
      return Object.values(data).map((item) => String(item)); // Si es objeto, extraer valores y convertir a string
    }
    return ["Formato desconocido de resultados"]; // Fallback en caso de error
  };

  return {
    showEtp1Modal,
    showEtp2Modal,
    etp1Results,
    etp2Results,
    getEtp1Results,
    getEtp2Results,
    closeEtp1Modal: () => setShowEtp1Modal(false),
    closeEtp2Modal: () => setShowEtp2Modal(false),
  };
}
