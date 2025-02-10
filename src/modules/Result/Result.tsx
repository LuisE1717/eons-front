import Frame from "../../components/UI/Frame/Frame";
import React, { useEffect, useState } from "react";
import { postMesagges } from "../../utils/api/evaluation";

interface ResultProps {
  token: string;
  language: string;
}

const Result: React.FC<ResultProps> = ({ token, language }) => {
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

    postMesagges(token, data)
      .then((res) => res.data)
      .then((data: string[]) => {
        setMessages(data);
        console.log(JSON.stringify(data, null, 2));
      });
  }, []);

  return (
    <Frame>
      <div className="launch-container w-full h-full flex items-center justify-center">
        <div
          className="coin-container 
       w-[90%]
       tablet:w-[50%]
       laptop:w-[30%]
       desktop:w-[20%]
       max-h-[58vh] 
       overflow-y-auto 
       p-4 
       pb-8
       flex flex-col items-center gap-4"
          style={{
            fontSize:
              messages.join(" ").length > 500
                ? "clamp(12px, 2.5vw, 16px)"
                : "clamp(16px, 3vw, 20px)",
          }}
        >
          {/* Renderizar los mensajes */}
          <p className="font-bold text-xl underline">{etapa}:</p>
          
          {etapa === "Etapa 1" ? (
            <>
              <p className="leading-relaxed mb-4">
                {messages.slice(0, 2).join(" ")}
              </p>
              <p className="leading-relaxed mt-4">{messages[2]}</p>
            </>
          ) : (
            messages.map((msg, index) => (
              <p key={index} className="leading-relaxed mb-4">
                {msg}
              </p>
            ))
          )}
        </div>
      </div>
    </Frame>
  );
};

export default Result;
