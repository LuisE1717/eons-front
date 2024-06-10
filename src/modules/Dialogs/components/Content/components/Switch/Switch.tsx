import { getI18N } from "../../../../../../i18n";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import { SECTIONS } from "../../../../constants";
import Section from "./components/Section/Section";

interface Props {
  selected: SECTIONS;
  handleChangeSection(s: SECTIONS): void;
}

export default function Switch({ selected, handleChangeSection }: Props) {
  const { translation } = useTranslation();

  return (
    <section className="flex mb-4 w-full rounded-full bg-gray-300">
      <Section
        handleClick={() => handleChangeSection(SECTIONS.DIALOGS)}
        selected={selected === SECTIONS.DIALOGS}
        text={translation.Dialogs.saved_dialogs}
      />
      <Section
        handleClick={() => handleChangeSection(SECTIONS.FAVORITES)}
        selected={selected === SECTIONS.FAVORITES}
        text={translation.Dialogs.favorites}
      />
    </section>
  );
}
