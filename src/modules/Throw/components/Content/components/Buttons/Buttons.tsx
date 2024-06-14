import React, { useContext } from "react";
import Button from "../../../../../../components/UI/Button/Button";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import { CoinContext } from "../../../../context/CoinContext";
import ButtonsContainer from "../../shared/components/ButtonsContainer/ButtonsContainer";

interface Props {
  handleClickMontado(): void;
  handleClickTranversal(): void;
  handleClickParado(): void;
}

export default function Buttons({
  handleClickMontado,
  handleClickParado,
  handleClickTranversal,
}: Props) {
  const { translation } = useTranslation();
  const { loading } = useContext(CoinContext);

  return (
    <ButtonsContainer>
      <Button loading={loading} onClick={handleClickMontado}>
        {translation.Throw.mount_throw}
      </Button>

      <Button onClick={handleClickParado} loading={loading}>
        {translation.Throw.stops_throw}
      </Button>

      <Button loading={loading} onClick={handleClickTranversal}>
        {translation.Throw.tranversal_throw}
      </Button>
    </ButtonsContainer>
  );
}
