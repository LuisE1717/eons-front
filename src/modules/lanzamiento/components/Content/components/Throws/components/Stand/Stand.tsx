import React, { useState, type Dispatch, type SetStateAction } from "react";
import Coin from "../../../../shared/components/Coin/Coin";
import Button from "../../../../../../../../components/UI/Button/Button";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";

interface Props {
  loading: boolean;
  moneda1: number;
  setMoneda1: Dispatch<SetStateAction<number>>;
  moneda2: number;
  setMoneda2: Dispatch<SetStateAction<number>>;
  handleSelectCoin: any;
  handleSelectDobleCoin: any;
  setThrowType: Dispatch<SetStateAction<string>>;
}

export default function Stand({
  loading,
  moneda1,
  setMoneda1,
  moneda2,
  setMoneda2,
  handleSelectCoin,
  handleSelectDobleCoin,
  setThrowType,
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
                  {translation.Throw.question_throw_stop1}
                </Button>
              </div>
              <div
                onClick={() => {
                  setStep(2);
                }}
              >
                <Button loading={loading}>
                  {translation.Throw.question_throw_stop2}
                </Button>
              </div>
              <div
                onClick={() => {
                  setStep(3);
                }}
              >
                <Button loading={loading}>
                  {translation.Throw.question_throw_stop3}
                </Button>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="flex flex-col items-center my-4">
              <span>{translation.Throw.question_stop1}</span>
            </div>

            <div className={`flex flex-col my-4`}>
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
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
              />
              <Coin
                loading={loading}
                id={2}
                svg="sun"
                condition="cross"
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
              />
            </div>

            <div className={`flex flex-col my-4`}>
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
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
              />
              <Coin
                id={4}
                svg="moon"
                condition="cross"
                loading={loading}
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
              />
            </div>

            <div className="flex flex-col items-center my-4">
              <span>{translation.Throw.question_stop2}</span>
            </div>

            <div className={`flex flex-col my-4`}>
              <span>{translation.Throw.coin1}</span>
            </div>

            <div className="flex grid-col justify-center my-4">
              <Coin
                loading={loading}
                id={1}
                svg="sun"
                condition="face"
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectDobleCoin}
              />
              <Coin
                loading={loading}
                id={2}
                svg="sun"
                condition="cross"
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectDobleCoin}
              />
            </div>

            <div className={`flex flex-col my-4`}>
              <span>{translation.Throw.coin2}</span>
            </div>

            <div className="flex grid-col justify-center my-4">
              <Coin
                id={3}
                svg="moon"
                condition="face"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectDobleCoin}
              />
              <Coin
                id={4}
                svg="moon"
                condition="cross"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectDobleCoin}
              />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="flex flex-col items-center my-4">
              <span>{translation.Throw.question_stop3}</span>
            </div>

            <div className={`flex flex-col my-4`}>
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

            <div className={`flex flex-col my-4`}>
              <span>{translation.Throw.coin2}</span>
            </div>

            <div className="flex grid-col justify-center my-4">
              <Coin
                id={1}
                svg="moon"
                condition="face"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                handleSelect={handleSelectCoin}
              />
              <Coin
                id={2}
                svg="moon"
                condition="cross"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                handleSelect={handleSelectCoin}
              />
            </div>
          </>
        );

      case 3:
        setThrowType("parado_montado");
      case 4:
        return (
          <>
            <div className="flex flex-col items-center my-4">
              <span>{translation.Throw.question_mount_stops1}</span>
            </div>

            <div className={`flex flex-col my-4`}>
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
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
              />
              <Coin
                loading={loading}
                id={2}
                svg="sun"
                condition="cross"
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
              />
            </div>

            <div className={`flex flex-col my-4`}>
              <span>{translation.Throw.coin2}</span>
            </div>

            <div className="flex grid-col justify-center my-4">
              <Coin
                id={1}
                svg="moon"
                condition="face"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
              />
              <Coin
                id={2}
                svg="moon"
                condition="cross"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
              />
            </div>

            <div className="flex flex-col items-center my-4">
              <span>{translation.Throw.question_mount_stops2}</span>
            </div>

            <div className={`flex flex-col my-4`}>
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
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectDobleCoin}
              />
              <Coin
                loading={loading}
                id={2}
                svg="sun"
                condition="cross"
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectDobleCoin}
              />
            </div>

            <div className={`flex flex-col my-4`}>
              <span>{translation.Throw.coin2}</span>
            </div>

            <div className="flex grid-col justify-center my-4">
              <Coin
                id={1}
                svg="moon"
                condition="face"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectCoin}
              />
              <Coin
                id={2}
                svg="moon"
                condition="cross"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectCoin}
              />
            </div>
          </>
        );
    }
  };

  return <>{showStep()}</>;
}
