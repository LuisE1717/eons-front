import Section from "./components/Section/Section";
import type { SwitchItem } from "../../domain";

interface Props {
  items: SwitchItem[];
}

export default function Switch({ items }: Props) {
  return (
    <section className="flex w-max rounded-full border-2 mb-2">
      {items.map((i, index) => (
        <Section handleClick={i.click} selected={i.selected} text={i.text} />
      ))}
    </section>
  );
}
