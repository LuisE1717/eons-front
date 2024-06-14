import React from "react";
import CoinText from "../../../../../../shared/components/CoinText/CoinText";
import useTranslation from "../../../../../../../../../Shared/hooks/useTranslation";
import CoinContainer from "../../../../../../shared/components/CoinContainer/CoinContainer";
import DobleCoin from "../../../../../../shared/components/DobleCoin/DobleCoin";

export default function Step2() {
  const { translation } = useTranslation();

  return (
    <>
      <CoinText>{translation.Throw.question_stop1}</CoinText>
      <CoinText>{translation.Throw.coin1}</CoinText>

      <CoinContainer>
        <DobleCoin id={1} svg="sun" condition="face" coin="1" />
        <DobleCoin id={2} svg="sun" condition="cross" coin="1" />
      </CoinContainer>

      <CoinText>{translation.Throw.coin2}</CoinText>

      <CoinContainer>
        <DobleCoin id={3} svg="moon" condition="face" coin="1" />
        <DobleCoin id={4} svg="moon" condition="cross" coin="1" />
      </CoinContainer>

      <CoinText>{translation.Throw.question_stop2}</CoinText>

      <CoinText>{translation.Throw.coin1}</CoinText>

      <CoinContainer>
        <DobleCoin id={1} svg="sun" condition="face" coin="2" />
        <DobleCoin id={2} svg="sun" condition="cross" coin="2" />
      </CoinContainer>

      <CoinText>{translation.Throw.coin2}</CoinText>

      <CoinContainer>
        <DobleCoin id={3} svg="moon" condition="face" coin="2" />
        <DobleCoin id={4} svg="moon" condition="cross" coin="2" />
      </CoinContainer>
    </>
  );
}
