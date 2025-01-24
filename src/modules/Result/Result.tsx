import Frame from "../../components/UI/Frame/Frame";
import React, { useEffect } from "react";
import { postMesagges } from "../../utils/api/evaluation";
import { useState } from "react";

interface ResultProps {
  token: string;
  language: string;
}
const Result: React.FC<ResultProps> = ({ token, language }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const hexResults = JSON.parse(localStorage.getItem("etp1") || "");
    const type = "evaluacion-etapa1";
    const data = {
      type,
      language,
      hexResults,
    };
    console.log(data);
    postMesagges(token, data)
      .then((data) => data.data)
      .then((data) => setMessage(data));
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
       max-h-[70vh] 
       overflow-y-auto 
       p-4 
       text-center"
          style={{
            fontSize:
              message.length > 500
                ? "clamp(12px, 2.5vw, 16px)"
                : "clamp(16px, 3vw, 20px)",
          }}
        >
          <p className="leading-relaxed">{message}</p>
        </div>
      </div>
    </Frame>
  );
};

export default Result;
