import React, {
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import Coin from "../components/Coin";
import styles from "../aplication/OpenDialog/OpenDialog.module.css";
import Button from "../../../components/UI/Button/Button";

interface Props {
  loading: boolean;
  moneda1: number;
  setMoneda1: Dispatch<SetStateAction<number>>;
  moneda2: number;
  setMoneda2: Dispatch<SetStateAction<number>>;
  handleSelectCoin: any;
  setType: Dispatch<SetStateAction<string>>;
  sendThrow: any;
  i18: any;
}

const TranversalThrow: FC<Props> = ({
  loading,
  moneda1,
  setMoneda1,
  moneda2,
  setMoneda2,
  handleSelectCoin,
  setType,
  sendThrow,
  i18,
}) => {
  const [step, setStep] = useState(0);



  const showStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="flex flex-col items-center mt-8 my-4">
              <span>{i18["Throw"].question2}</span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center my-4">
              <div
                onClick={() => {
                  setStep(1);
                }}
              >
                <Button loading={loading}>
                  {i18["Throw"].question_throw_tranversal1}
                </Button>
              </div>
              <div
                onClick={() => {
                  sendThrow();
                }}
              >
                <Button loading={loading}>
                  {i18["Throw"].question_throw_tranversal2}
                </Button>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="flex flex-col items-center my-4">
              <span className={styles.span}>
                {i18["Throw"].question_tranversal}
              </span>
            </div>

            <div className={`flex flex-col ${styles.coin_number} my-4`}>
              <span className={styles.span}>{i18["Throw"].coin1}</span>
            </div>

            <div className="flex grid-col justify-center my-4">
              <Coin
                loading={loading}
                id={1}
                big={true}
                condition="face"
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                handleSelect={handleSelectCoin}
              />
              <Coin
                loading={loading}
                id={2}
                big={true}
                condition="cross"
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                handleSelect={handleSelectCoin}
              />
            </div>

            <div className={`flex flex-col ${styles.coin_number} my-4`}>
              <span>{i18["Throw"].coin2}</span>
            </div>

            <div className="flex grid-col justify-center my-4">
              <Coin
                id={3}
                big={false}
                condition="face"
                loading={loading}
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                handleSelect={handleSelectCoin}
              />
              <Coin
                id={4}
                big={false}
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
};

export default TranversalThrow;
