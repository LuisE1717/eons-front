import Coin from "../../../../shared/components/Coin/Coin";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";
import CoinText from "../../../../shared/components/CoinText/CoinText";
import CoinContainer from "../../../../shared/components/CoinContainer/CoinContainer";

export default function Normal() {
  const { translation } = useTranslation();

  return (
    <>
      <CoinText>{translation.Throw.question}</CoinText>
      <CoinText>{translation.Throw.coin1}</CoinText>

      <CoinContainer>
        <Coin id={1} svg="sun" condition="face" coin="1" />
        <Coin id={2} svg="sun" condition="cross" coin="1" />
      </CoinContainer>

      <CoinText>{translation.Throw.coin2}</CoinText>

      <CoinContainer>
        <Coin id={1} svg="moon" condition="face" coin="2" />
        <Coin id={2} svg="moon" condition="cross" coin="2" />
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
