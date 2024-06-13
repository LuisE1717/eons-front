import type { Spirit } from "../../../../interfaces";
import Icon from "./components/Icon/Icon";

interface Props {
  spirit: Spirit;
  handleClick(): void;
}

export default function Card({ spirit, handleClick }: Props) {
  return (
    <article
      className="flex items-center gap-x-5 cursor-pointer"
      onClick={handleClick}
    >
      <Icon />
      <p className="sm:text-lg text-base">{spirit.name}</p>
    </article>
  );
}
