import React from "react";
import CoinText from "../../../../../../shared/components/CoinText/CoinText";
import CoinContainer from "../../../../../../shared/components/CoinContainer/CoinContainer";
import Coin from "../../../../../../shared/components/Coin/Coin";
import useTranslation from "../../../../../../../../../Shared/hooks/useTranslation";

export default function Step2() {
  const { translation } = useTranslation();

  return (
    <>
      <CoinText>{translation.Throw.question_tranversal}</CoinText>

      <CoinText>{translation.Throw.coin1}</CoinText>

      <CoinContainer>
        <Coin id={1} svg="sun" condition="face" coin="1" />
        <Coin id={2} svg="sun" condition="cross" coin="1" />
      </CoinContainer>

      <CoinText>{translation.Throw.coin2}</CoinText>

      <CoinContainer>
        <Coin id={3} svg="moon" condition="face" coin="1" />
        <Coin id={4} svg="moon" condition="cross" coin="1" />
      </CoinContainer>
    </>
  );
}
