import Frame from "@components/UI/Frame/Frame";
import React from "react";
import useResult from "../application/useResult";

interface ResultProps {
  token: string;
  language: string;
}

const Result: React.FC<ResultProps> = ({ token, language }) => {
  const { messages, etapa } = useResult(token, language);

  return (
    <Frame>
      <div className="launch-container w-full h-full phone:h-auto flex items-center justify-center">
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
