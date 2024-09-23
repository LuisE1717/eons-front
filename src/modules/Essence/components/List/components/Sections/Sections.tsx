import useTranslation from "../../../../../Shared/hooks/useTranslation";
import { SECTION } from "../../domain";
import SectionButton from "./components/SectionButton/SectionButton";

interface Props {
  handleChange(s: SECTION): void;
  selected: SECTION | null;
}

export default function Sections({ handleChange, selected }: Props) {
  const { translation } = useTranslation();
  return (
    <div className="w-max flex flex-col items-center gap-y-3 mb-4 mt-10">
      <SectionButton
        handleClick={() => handleChange(SECTION.TRANSFER)}
        selected={selected === SECTION.TRANSFER}
        text={`${translation.Esence.transfer}.`}
        disabled={false}
      />

      <SectionButton
        handleClick={() => handleChange(SECTION.TRANSFER_HISTORIAL)}
        selected={selected === SECTION.TRANSFER_HISTORIAL}
        text={`${translation.Esence.historial}.`}
        disabled={true}
      />

      <SectionButton
        handleClick={() => handleChange(SECTION.DONATION)}
        selected={selected === SECTION.DONATION}
        text={`${translation.Esence.donation}.`}
        disabled={true}
      />

      <SectionButton
        handleClick={() => handleChange(SECTION.PAY)}
        selected={selected === SECTION.PAY}
        text={`${translation.Esence.pay_deude}.`}
        disabled={true}
      />
    </div>
  );
}
