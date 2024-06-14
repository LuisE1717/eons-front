import { useContext, useState } from "react";
import Step1 from "./components/Step1/Step1";
import { CoinContext } from "../../../../../../context/CoinContext";
import { TYPES } from "../../../../../../domain/types";
import Step2 from "./components/Step2/Step2";
import Step3 from "./components/Step3/Step3";
import Step4 from "./components/Step4/Step4";

export default function Stand() {
  const { handleChangeThrowType } = useContext(CoinContext);

  const [step, setStep] = useState(0);

  function handleChangeStep(v: number) {
    setStep(v);

    if (v === 3) {
      handleChangeThrowType(TYPES.PARADO_MONTADO);
    }
  }

  return (
    <>
      {step === 0 && <Step1 handleChangeStep={handleChangeStep} />}
      {step === 1 && <Step2 />}
      {step === 2 && <Step3 />}
      {step === 4 && <Step4 />}
    </>
  );
}
