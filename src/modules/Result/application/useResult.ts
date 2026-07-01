import { useEffect, useState } from "react";
import { postMesagges } from "@modules/Launch/infrastructure/evaluationApi";

// Use case: build the evaluation result messages for the current stage.
// Reads the stored stage results, requests the messages and exposes them so the
// component never talks to the API directly.
export default function useResult(token: string, language: string) {
  const [messages, setMessages] = useState<string[]>([]);
  const [etapa, setEtapa] = useState("Etapa 1");

  useEffect(() => {
    const etp1 = localStorage.getItem("etp1") || "null";
    const etp2 = localStorage.getItem("etp2") || "null";
    const hexResults = etp2 !== "null" ? JSON.parse(etp2) : JSON.parse(etp1);
    const type = etp2 !== "null" ? "evaluacion-etapa2" : "evaluacion-etapa1";

    if (etp2 !== "null") {
      setEtapa("Etapa 2");
    }

    const data = {
      type,
      language,
      hexResults,
    };

    postMesagges(token, data).then((res) => {
      if (res.data) {
        // Convert the response object to an array of strings for display
        const messages = [
          res.data.resultadoFinal,
          res.data.interpretacion,
        ].filter(Boolean);
        setMessages(messages);
        console.log(JSON.stringify(res.data, null, 2));
      }
    });
  }, []);

  return { messages, etapa };
}
