import { SECTION } from "../../domain";
import SectionButton from "./components/SectionButton/SectionButton";

interface Props {
  handleChange(s: SECTION): void;
  selected: SECTION;
}

export default function Sections({ handleChange, selected }: Props) {
  return (
    <div className="w-full grid grid-cols-2 mb-4 bg-white border-2 rounded-full">
      <SectionButton
        handleClick={() => handleChange(SECTION.BUY)}
        selected={selected === SECTION.BUY}
        text="Comprar"
      />

      <SectionButton
        handleClick={() => handleChange(SECTION.TRANSFER)}
        selected={selected === SECTION.TRANSFER}
        text="Transferir"
      />
    </div>
  );
}
