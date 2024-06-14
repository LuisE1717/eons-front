import useTranslation from "../../../../../../../../../Shared/hooks/useTranslation";
import CoinText from "../../../../../../shared/components/CoinText/CoinText";
import DobleCoin from "../../../../../../shared/components/DobleCoin/DobleCoin";
import CoinContainer from "../../../../../../shared/components/CoinContainer/CoinContainer";

export default function Step4() {
  const { translation } = useTranslation();

  return (
    <>
      <CoinText>{translation.Throw.question_mount_stops1}</CoinText>

      <CoinText>{translation.Throw.coin1}</CoinText>

      <CoinContainer>
        <DobleCoin id={1} svg="sun" condition="face" coin="1" />
        <DobleCoin id={2} svg="sun" condition="cross" coin="1" />
      </CoinContainer>

      <CoinText>{translation.Throw.coin2}</CoinText>

      <CoinContainer>
        <DobleCoin id={1} svg="moon" condition="face" coin="2" />
        <DobleCoin id={2} svg="moon" condition="cross" coin="2" />
      </CoinContainer>

      <CoinText>{translation.Throw.question_mount_stops2}</CoinText>

      <CoinText>{translation.Throw.coin1}</CoinText>

      <CoinContainer>
        <DobleCoin coin="1" id={1} svg="sun" condition="face" />
        <DobleCoin id={2} svg="sun" condition="cross" coin="1" />
      </CoinContainer>

      <CoinText>{translation.Throw.coin2}</CoinText>

      <CoinContainer>
        <DobleCoin id={1} svg="moon" condition="face" coin="2" />
        <DobleCoin id={2} svg="moon" condition="cross" coin="2" />
      </CoinContainer>
    </>
  );
}
