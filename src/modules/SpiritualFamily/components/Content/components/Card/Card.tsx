import type { Spirit } from "../../../../interfaces";
import Icon from "./components/Icon/Icon";

interface Props {
  spirit: Spirit;
}

export default function Card({ spirit }: Props) {
  return (
    <article className="flex items-center gap-x-5">
      <Icon />
      <p className="sm:text-lg text-base">{spirit.name}</p>
    </article>
  );
}
