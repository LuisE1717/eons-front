import { SECTION } from "../../domain";
import SectionButton from "./components/SectionButton/SectionButton";

interface Props {
  handleChange(s: SECTION): void;
  selected: SECTION | null;
}

export default function Sections({ handleChange, selected }: Props) {
  return (
    <div className="w-max flex flex-col items-center gap-y-3 mb-4 mt-10">
      <SectionButton
        handleClick={() => handleChange(SECTION.TRANSFER)}
        selected={selected === SECTION.TRANSFER}
        text="Transferir Esencia."
        disabled={false}
      />

      <SectionButton
        handleClick={() => handleChange(SECTION.DONATION)}
        selected={selected === SECTION.DONATION}
        text="Realizar donación."
        disabled={true}
      />

      <SectionButton
        handleClick={() => handleChange(SECTION.PAY)}
        selected={selected === SECTION.PAY}
        text="Pagar deuda a la Raíz del Sistema."
        disabled={true}
      />
    </div>
  );
}
