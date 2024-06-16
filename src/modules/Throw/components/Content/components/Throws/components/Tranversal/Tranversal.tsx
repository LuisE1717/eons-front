import { useState } from "react";
import Step2 from "./components/Step2/Step2";
import Step1 from "./components/Step1/Step1";

interface Props {
  handleSendThrow(): void;
}

export default function Tranversal({ handleSendThrow }: Props) {
  const [step, setStep] = useState(0);

  function handleChangeStep() {
    setStep(1);
  }

  return (
    <>
      {step === 0 && (
        <Step1
          handleSendThrow={handleSendThrow}
          handleChangeStep={handleChangeStep}
        />
      )}
      {step === 1 && <Step2 />}
    </>
  );
}
