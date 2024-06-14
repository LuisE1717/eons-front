import { useState, type Dispatch, type SetStateAction } from "react";
import Coin from "../../../../shared/components/Coin/Coin";
import Button from "../../../../../../../../components/UI/Button/Button";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";

interface Props {
  loading: boolean;
  moneda1: number;
  setMoneda1: Dispatch<SetStateAction<number>>;
  handleSelectCoin: any;
  sendThrow: any;
}

export default function Tranversal({
  loading,
  moneda1,
  setMoneda1,
  handleSelectCoin,
  sendThrow,
}: Props) {
  const { translation } = useTranslation();

  const [step, setStep] = useState(0);

  const showStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="flex flex-col items-center mt-8 my-4">
              <span>{translation.Throw.question2}</span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center my-4">
              <div
                onClick={() => {
                  setStep(1);
                }}
              >
                <Button loading={loading}>
                  {translation.Throw.question_throw_tranversal1}
                </Button>
              </div>
              <div
                onClick={() => {
                  sendThrow();
                }}
              >
                <Button loading={loading}>
                  {translation.Throw.question_throw_tranversal2}
                </Button>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="flex flex-col items-center my-4">
              <span>{translation.Throw.question_tranversal}</span>
            </div>

            <div className="flex flex-col my-4">
              <span>{translation.Throw.coin1}</span>
            </div>

            <div className="flex grid-col justify-center my-4">
              <Coin
                loading={loading}
                id={1}
                svg="sun"
                condition="face"
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                handleSelect={handleSelectCoin}
              />
              <Coin
                loading={loading}
                id={2}
                svg="sun"
                condition="cross"
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                handleSelect={handleSelectCoin}
              />
            </div>

            <div className="flex flex-col my-4">
              <span>{translation.Throw.coin2}</span>
            </div>

            <div className="flex grid-col justify-center my-4">
              <Coin
                id={3}
                svg="moon"
                condition="face"
                loading={loading}
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                handleSelect={handleSelectCoin}
              />
              <Coin
                id={4}
                svg="moon"
                condition="cross"
                loading={loading}
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                handleSelect={handleSelectCoin}
              />
            </div>
          </>
        );
    }
  };

  return <>{showStep()}</>;
}
