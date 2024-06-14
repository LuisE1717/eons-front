import { type Dispatch, type FC, type SetStateAction } from "react";
import Coin from "../../../../shared/components/Coin/Coin";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";
import CoinText from "../../../../shared/components/CoinText/CoinText";
import CoinContainer from "../../../../shared/components/CoinContainer/CoinContainer";

interface Props {
  loading: boolean;
  moneda1: number;
  setMoneda1: Dispatch<SetStateAction<number>>;
  moneda2: number;
  setMoneda2: Dispatch<SetStateAction<number>>;
  handleSelectCoin: any;
  lastThrow: string;
}

export default function Normal({
  loading,
  moneda1,
  setMoneda1,
  moneda2,
  setMoneda2,
  handleSelectCoin,
  lastThrow,
}: Props) {
  const { translation } = useTranslation();
  return (
    <>
      <CoinText>{translation.Throw.question}</CoinText>
      <CoinText>{translation.Throw.coin1}</CoinText>

      <CoinContainer>
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
      </CoinContainer>

      <CoinText>{translation.Throw.coin2}</CoinText>

      <CoinContainer>
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
      </CoinContainer>

      {/* <div className="flex flex-col items-center mt-8 my-4">
                <span>
                    Lanzamiento Especial
                </span>
            </div>

    <div className="flex flex-wrap gap-2 justify-center my-4">
        <ButtonReact loading={loading} color="white" text="Cayeron montadas"/>
        <ButtonReact loading={loading} color="white" text="Cayeron paradas"/>
        <ButtonReact loading={loading} color="white" text="Cayó tranversal"/>
    </div>    */}
    </>
  );
}
