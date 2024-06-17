import { useContext } from "react";
import useTranslation from "../../../../../../../../../Shared/hooks/useTranslation";
import Button from "../../../../../../../../../../components/UI/Button/Button";
import CoinText from "../../../../../../shared/components/CoinText/CoinText";
import ButtonsContainer from "../../../../../../shared/components/ButtonsContainer/ButtonsContainer";
import useStore from "../../../../../../shared/hooks/useStore";

interface Props {
  handleChangeStep(): void;
  handleSendThrow(): void;
}

export default function Step1({ handleChangeStep, handleSendThrow }: Props) {
  const { loading } = useStore();
  const { translation } = useTranslation();

  return (
    <>
      <CoinText>{translation.Throw.question2}</CoinText>

      <ButtonsContainer>
        <Button loading={loading} onClick={handleChangeStep}>
          {translation.Throw.question_throw_tranversal1}
        </Button>

        <Button loading={loading} onClick={handleSendThrow}>
          {translation.Throw.question_throw_tranversal2}
        </Button>
      </ButtonsContainer>
    </>
  );
}
