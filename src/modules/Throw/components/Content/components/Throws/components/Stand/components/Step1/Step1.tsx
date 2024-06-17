import React, { useContext } from "react";
import useTranslation from "../../../../../../../../../Shared/hooks/useTranslation";
import Button from "../../../../../../../../../../components/UI/Button/Button";
import ButtonsContainer from "../../../../../../shared/components/ButtonsContainer/ButtonsContainer";
import CoinText from "../../../../../../shared/components/CoinText/CoinText";
import useStore from "../../../../../../shared/hooks/useStore";

interface Props {
  handleChangeStep(v: number): void;
}

export default function Step1({ handleChangeStep }: Props) {
  const { loading } = useStore();
  const { translation } = useTranslation();

  return (
    <>
      <CoinText>{translation.Throw.question2}</CoinText>

      <ButtonsContainer>
        <Button loading={loading} onClick={() => handleChangeStep(1)}>
          {translation.Throw.question_throw_stop1}
        </Button>

        <Button loading={loading} onClick={() => handleChangeStep(2)}>
          {translation.Throw.question_throw_stop2}
        </Button>

        <Button loading={loading} onClick={() => handleChangeStep(3)}>
          {translation.Throw.question_throw_stop3}
        </Button>
      </ButtonsContainer>
    </>
  );
}
