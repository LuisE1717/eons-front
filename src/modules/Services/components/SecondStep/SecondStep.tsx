import Step from "../../shared/components/Step/Step";
import P from "../../shared/components/P/P";
import useTranslation from "../../../Shared/hooks/useTranslation";
import PhoneView from "../../shared/components/PhoneView/PhoneView";
import Image from "../../shared/components/Image/Image";

export default function SecondStep() {
  const { translation } = useTranslation();

  return (
    <Step>
      <P>{translation.Services.step_2}</P>

      <PhoneView>
        <Image image="/brain.png" />
      </PhoneView>
    </Step>
  );
}
