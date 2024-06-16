import React, {
  useContext,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import Coin from "../../../../shared/components/Coin/Coin";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";
import { TYPES } from "../../../../../../domain/types";
import CoinText from "../../../../shared/components/CoinText/CoinText";
import CoinContainer from "../../../../shared/components/CoinContainer/CoinContainer";
import DobleCoin from "../../../../shared/components/DobleCoin/DobleCoin";
import { CoinContext } from "../../../../../../context/CoinContext";

export default function Mount() {
  const { translation } = useTranslation();
  const { throwType: type } = useContext(CoinContext);

  return (
    <>
      <CoinText>
        {type === TYPES.PARADO_MONTADO
          ? translation.Throw.question_mount_stops1
          : translation.Throw.question_mount1}
      </CoinText>

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

      <CoinText>
        {type === TYPES.PARADO_MONTADO
          ? translation.Throw.question_mount_stops2
          : translation.Throw.question_mount2}
      </CoinText>

      <CoinText>{translation.Throw.coin1}</CoinText>

      <CoinContainer>
        <DobleCoin id={1} svg="sun" condition="face" coin="2" />
        <DobleCoin id={2} svg="sun" coin="2" condition="cross" />
      </CoinContainer>

      <CoinText>{translation.Throw.coin2}</CoinText>

      <CoinContainer>
        <DobleCoin id={3} svg="moon" condition="face" coin="2" />
        <DobleCoin id={4} svg="moon" condition="cross" coin="2" />
      </CoinContainer>
    </>
  );
}
