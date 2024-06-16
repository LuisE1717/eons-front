import React from "react";
import Coin from "../../../../../../shared/components/Coin/Coin";
import CoinText from "../../../../../../shared/components/CoinText/CoinText";
import useTranslation from "../../../../../../../../../Shared/hooks/useTranslation";
import CoinContainer from "../../../../../../shared/components/CoinContainer/CoinContainer";

export default function Step3() {
  const { translation } = useTranslation();

  return (
    <>
      <CoinText>{translation.Throw.question_stop3}</CoinText>

      <CoinText>{translation.Throw.coin1}</CoinText>

      <CoinContainer>
        <Coin id={1} svg="sun" condition="face" coin="1" />
        <Coin id={2} svg="sun" condition="cross" coin="1" />
      </CoinContainer>

      <CoinText>{translation.Throw.coin2}</CoinText>

      <CoinContainer>
        <Coin id={1} svg="moon" condition="face" coin="1" />
        <Coin id={2} svg="moon" condition="cross" coin="2" />
      </CoinContainer>
    </>
  );
}
